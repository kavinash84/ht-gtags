import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
/* ====== Components ====== */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
/* ====== Modules ====== */
import { setFilter } from "redux/modules/products";
import * as actionCreators from "redux/modules/search";
import { formatProductURL } from "utils/helper";

/* ====== Page Components ====== */

const styles = require("./Search.scss");
const SearchIcon = require("../../../static/search-icon.svg");
const CloseIcon = require("../../../static/close-icon.svg");

// const onClick = setFilterState => e => {
//   e.preventDefault();
//   setFilterState('clearAll');
// };

// const onSubmit = (searchQuery, history, hideResultsOnSubmit, results, setFilterState) => e => {
//   e.preventDefault();
//   hideResultsOnSubmit();
//   setFilterState('clearAll');
//   if (results && results.length > 0) {
//     const match = results.filter(result => result.name.toLowerCase() === searchQuery.toLowerCase())[0];
//     if (match) return history.push(`/${match.url_key}`);
//   }
//   return history.push(`/search/?q=${searchQuery}`);
// };

const navigateToPDP = history => (name, sku) => {
  const productURL = formatProductURL(name, sku);
  history.push(productURL);
};
const navigateToSearch = history => (path, query) => {
  // const url = `search/?q=${query}`;
  // history.push(url);
  history.push({
    pathname: `${path}`,
    // ${query ? `/?${query}` : ''}`,
    search: `${query}`,
    state: {
      query,
      path,
      pincode: window.getPincode(),
      pinSetByUser: window.isPincodeFilter()
    }
  });
};

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...actionCreators, setFilterState: setFilter },
    dispatch
  );

// const getSuggestions = results => results;

// const getSuggestionValue = suggestion => suggestion.name;

// const renderSuggestion = setFilterState => suggestion => (
//   <Link to={`/${suggestion.url_key}`} onClick={onClick(setFilterState)}>
//     {suggestion.name}
//   </Link>
// );

/* eslint react/prop-types: 0 */
// const renderSuggestionsContainer = ({ loaded }) => ({ containerProps, children }) => (
//   <Box>
//     {loaded && (
//       <Box {...containerProps} p="0" className={`${styles.searchList} ${styles.active}`}>
//         {children}
//       </Box>
//     )}
//   </Box>
// );

class Search extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ""
      // suggestions: [],
      // unbxdLoaded: false
    };
  }
  componentDidMount() {
    const { history } = this.props;
    window.unbxd_autosuggest_fun();
    window.HTSEARCH = {};
    window.HTSEARCH.navigateToPDP = navigateToPDP(history);
    window.HTSEARCH.navigateToSearch = navigateToSearch(history);
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({
      value
    });
  };

  // onSuggestionsFetchRequested = async ({ value }) => {
  //   const { load, setSearchQuery } = this.props;
  //   const { dispatch } = this.context.store;
  //   dispatch(setSearchQuery(value));
  //   if (value.length >= 3) {
  //     await load(value);
  //     const { results } = this.props;
  //     this.setState({
  //       suggestions: getSuggestions(results)
  //     });
  //   }
  // };
  // onSuggestionsClearRequested = () => {
  //   // Implement Suggesion Clear Reuest if needed here
  // };
  // onSuggestionsClear = async () => {
  //   const { dispatch } = this.context.store;
  //   const { clearSearchQuery } = this.props;
  //   await dispatch(clearSearchQuery());
  //   this.setState({
  //     value: ''
  //   });
  // };
  // onSuggestionSelected = (e, { suggestion }) => {
  //   e.preventDefault();
  //   const { history } = this.props;
  //   history.push(`/${suggestion.url_key}`);
  // };

  render() {
    const { searchQuery } = this.props;
    const { value } = this.state;

    // Autosuggest will pass through all these props to the input.

    return (
      <Box width={1} className={styles.search} sx={{ border: "dividerBold" }}>
        {/* <form onSubmit={onSubmit(searchQuery, history, hideResultsOnSubmit, results, setFilterState)}>
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
        {searchQuery === '' ? (
          <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
        ) : (
          <Button
            className={styles.closeBtn}
            onClick={this.onSuggestionsClear}
            btnType="custom"
            bg="transparent"
            border="none"
            p="0"
          >
            <img src={CloseIcon} alt="Close" />
          </Button>
        )} */}
        <input
          id="ht_generic_search"
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          className={styles.inputSearch}
          value={value}
        />
        {searchQuery === "" ? (
          <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
        ) : (
          <Button
            className={styles.closeBtn}
            onClick={this.onSuggestionsClear}
            btnType="custom"
            bg="transparent"
            border="none"
            p="0"
          >
            <img src={CloseIcon} alt="Close" />
          </Button>
        )}
      </Box>
    );
  }
}

Search.defaultProps = {
  searchQuery: ""
  // loading: false,
  // loaded: false,
  // results: []
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  // loading: PropTypes.bool,
  // loaded: PropTypes.bool,
  // results: PropTypes.array,
  // load: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
  // hideResultsOnSubmit: PropTypes.func.isRequired,
  // setSearchQuery: PropTypes.func.isRequired,
  // clearSearchQuery: PropTypes.func.isRequired,
  // setFilterState: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
