import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Input from 'hometown-components/lib/Input';
import Div from "hometown-components-dev/lib/BoxHtV1";
import * as actionCreators from 'redux/modules/pincode';

// const NO_RELOAD = ['/checkout/cart'];

const styles = require('./Cart.scss');

const onChange = (dispatcher, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  if (value.length >= 2) load(value);
};

const setPincodeInStore = (dispatcher, pincode) => e => {
  e.preventDefault();
  if (pincode) {
    dispatcher(pincode);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const mapStateToProps = ({ pincode }) => ({
  ...pincode
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

class CartPincode extends React.Component {
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
    const { setPincodeOrCityQuery, setPincode, pincodeQuery, load, loading, loaded, results, showResults } = this.props;
    return (
      <Div className={styles.pincode} pt="0" pb="0.3125rem">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            // id="pincode_input"
            placeholder="Enter Pincode For Delivery Details"
            onChange={onChange(setPincodeOrCityQuery, load)}
            value={pincodeQuery}
            ref={this.pincodeinputref}
            style={{ background: 'white', padding: '5px 10px', color: '#707070' , border:'1px solid #707070', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}
          />
          <div
            style={{ color: '#F47020', fontSize: '16px', backgroundColor:'#F2F2F2' ,  border:'1px solid #707070', borderTopRightRadius:'5px', borderBottomRightRadius:'5px', padding: '10px 20px', height:'40px', cursor:'pointer'}}
            onClick={setPincodeInStore(setPincode, pincodeQuery)}
          >
            Check
          </div>
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
                  <button onClick={setPincodeInStore(setPincode, item.name)}>{item.name}</button>
                </li>
              ))}
            </ul>
          )}
        </Div>
      </Div>
    );
  }
}

CartPincode.defaultProps = {
  pincodeQuery: '',
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

CartPincode.propTypes = {
  pincodeQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  setPincodeOrCityQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPincode);
