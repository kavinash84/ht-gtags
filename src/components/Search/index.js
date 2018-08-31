import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/search';

const styles = require('./Search.scss');
const SearchIcon = require('../../../static/search-icon.svg');
const CloseIcon = require('../../../static/close-icon.svg');

const onSubmit = (searchQuery, history, hideResultsOnSubmit, results) => e => {
  e.preventDefault();
  hideResultsOnSubmit();
  if (results && results.length > 0) {
    const match = results.filter(result => result.name.toLowerCase() === searchQuery.toLowerCase())[0];
    if (match) return history.push(`/${match.url_key}`);
  }
  return history.push(`/search/?q=${searchQuery}`);
};

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const getSuggestions = results => results;

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <Link to={`/${suggestion.url_key}`}>{suggestion.name}</Link>;

const renderInputComponent = inputProps => (
  <input
    type="text"
    placeholder="Search"
    backgroundColor="rgba(0, 0, 0, 0.05)"
    borderColor="rgba(0, 0, 0, 0.03)"
    height="2.5rem"
    {...inputProps}
    className={styles.inputSearch}
  />
);
/* eslint react/prop-types: 0 */
const renderSuggestionsContainer = ({ loaded }) => ({ containerProps, children }) => (
  <div>
    {loaded && (
      <Div {...containerProps} className={`${styles.searchList} ${styles.active}`}>
        {children}
      </Div>
    )}
  </div>
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
    if (value.length >= 2) {
      await load(value);
      const { results } = this.props;
      this.setState({
        suggestions: getSuggestions(results)
      });
    }
  };
  onSuggestionsClearRequested = async () => {
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
      searchQuery, load, loading, loaded, results, hideResultsOnSubmit, history
    } = this.props;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      onChange: this.onChange,
      value
    };
    return (
      <Div className={styles.search} pt="0" pb="0.3125rem">
        <form onSubmit={onSubmit(searchQuery, history, hideResultsOnSubmit, results)}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
            renderSuggestionsContainer={renderSuggestionsContainer({ load, loading, loaded })}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </form>
        {searchQuery === '' ? (
          <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
        ) : (
          <Button
            className={styles.closeBtn}
            onClick={this.onSuggestionsClearRequested}
            btnType="custom"
            bg="transparent"
            border="none"
            p="0"
          >
            <img src={CloseIcon} alt="Close" />
          </Button>
        )}
      </Div>
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
  clearSearchQuery: PropTypes.func.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Search));
