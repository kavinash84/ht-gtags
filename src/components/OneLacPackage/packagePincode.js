import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Div from "hometown-components-dev/lib/BoxHtV1";
import * as actionCreators from "redux/modules/pincode";

const styles = require("./index.scss");

const onChange = (dispatcher, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  if (value.length >= 2) load(value);
};

const setPincodeInStore = (
  dispatcher,
  pincode,
  handleModal,
  handleBannerClick
) => e => {
  e.preventDefault();
  if (pincode) {
    dispatcher(pincode);
    setTimeout(() => {
      handleBannerClick(false);
    }, 1000);
  }
};

const mapStateToProps = ({ pincode }) => ({
  ...pincode
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators }, dispatch);

class PackagePincode extends React.Component {
  constructor(props) {
    super(props);
    this.pincodeinputref = React.createRef();
  }
  componentDidMount() {
    if (this.pincodeinputref.current) {
      this.pincodeinputref.current.focus();
    }
  }
  render() {
    const {
      setPincodeOrCityQuery,
      setPincode,
      pincodeQuery,
      load,
      loading,
      loaded,
      results,
      showResults,
      handleModal,
      handleBannerClick
    } = this.props;
    return (
      <Div className={styles.package_pincode} pt="0" pb="0.3125rem">
        <div
          style={{
            width: "100%"
          }}
        >
          <input
            type="text"
            placeholder="Enter Pincode For Delivery Details"
            onChange={onChange(setPincodeOrCityQuery, load)}
            value={pincodeQuery}
            ref={this.pincodeinputref}
            style={{
              background: "white",
              borderRadius: "7px",
              padding: "25px 15px",
              color: "#707070",
              borderColor: "#E3E3E3"
            }}
          />
        </div>
        <Div className={`${styles.searchList} ${styles.active}`}>
          {loading && (
            <ul>
              <li> Searching.... </li>
            </ul>
          )}
          {loaded && showResults && results.length > 0 && (
            <ul>
              {results.map((item, index) => (
                <li key={String(index)}>
                  <button
                    onClick={setPincodeInStore(
                      setPincode,
                      item.name,
                      handleModal,
                      handleBannerClick
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <button
            style={{
              width: "50%",
              color: "#F47020",
              padding: "15px",
              background: "white",
              border: "1px solid #F47020",
              borderRadius: "5px",
              margin: "45px 0px"
            }}
            onClick={setPincodeInStore(
              setPincode,
              pincodeQuery,
              handleModal,
              handleBannerClick
            )}
          >
            Submit
          </button>
        </div>
      </Div>
    );
  }
}

PackagePincode.defaultProps = {
  pincodeQuery: "",
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

PackagePincode.propTypes = {
  pincodeQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  setPincodeOrCityQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagePincode);
