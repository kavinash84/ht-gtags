import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

/* ====== Modules ====== */
import { setFilter } from 'redux/modules/products';
import * as actionCreators from 'redux/modules/search';

/* ====== selectors ====== */

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import InputField from 'hometown-components-dev/lib/InputFieldHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/* ====== Page Components ====== */

const SearchIcon = require('../../../static/search.svg');
const CloseIcon = require('../../../static/close-icon.svg');

const onClick = setFilterState => e => {
  e.preventDefault();
  setFilterState('clearAll');
};

const onSubmit = (searchQuery, history, hideResultsOnSubmit, results, setFilterState) => e => {
  e.preventDefault();
  hideResultsOnSubmit();
  setFilterState('clearAll');
  if (results && results.length > 0) {
    const match = results.filter(result => result.name.toLowerCase() === searchQuery.toLowerCase())[0];
    if (match) return history.push(`/${match.url_key}`);
  }
  return history.push(`/search/?q=${searchQuery}`);
};

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators, setFilterState: setFilter }, dispatch);

const getSuggestions = results => results;

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = setFilterState => suggestion => (
  <Link to={`/${suggestion.url_key}`} onClick={onClick(setFilterState)}>
    {suggestion.name}
  </Link>
);

const renderInputComponent = inputProps => (
  <InputField variant="inputSearch" type="text" placeholder="Search" {...inputProps} />
);
/* eslint react/prop-types: 0 */
const renderSuggestionsContainer = ({ loaded }) => ({ containerProps, children }) => (
  <Box>
    {loaded && (
      <Box {...containerProps} p="0">
        {children}
      </Box>
    )}
  </Box>
);

class Search extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    value: '',
    suggestions: []
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    const { load, setSearchQuery } = this.props;
    const { dispatch } = this.context.store;
    dispatch(setSearchQuery(value));
    if (value.length >= 3) {
      await load(value);
      const { results } = this.props;
      this.setState({
        suggestions: getSuggestions(results)
      });
    }
  };

  onSuggestionsClearRequested = () => {
    // Implement Suggesion Clear Reuest if needed here
  };

  onSuggestionsClear = async () => {
    const { dispatch } = this.context.store;
    const { clearSearchQuery } = this.props;
    await dispatch(clearSearchQuery());
    this.setState({
      value: ''
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`/${suggestion.url_key}`);
  };

  render() {
    const {
 searchQuery, load, loading, loaded, results, hideResultsOnSubmit, history, setFilterState
} = this.props;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      onChange: this.onChange,
      value
    };

    return (
      <Box width={1}>
        <form onSubmit={onSubmit(searchQuery, history, hideResultsOnSubmit, results, setFilterState)}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion(setFilterState)}
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
            renderSuggestionsContainer={renderSuggestionsContainer({ load, loading, loaded })}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </form>
        <Box
          sx={{
            position: 'absolute',
            right: 25,
            top: 10
          }}
        >
          {searchQuery === '' ? (
            <Image height={16} src={SearchIcon} alt="Search" />
          ) : (
            <Button variant="link" onClick={this.onSuggestionsClear}>
              <Image height={16} src={CloseIcon} alt="Close" />
            </Button>
          )}
        </Box>
      </Box>
    );
  }
}

Search.defaultProps = {
  searchQuery: '',
  loading: false,
  loaded: false,
  results: []
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  hideResultsOnSubmit: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  clearSearchQuery: PropTypes.func.isRequired,
  setFilterState: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
