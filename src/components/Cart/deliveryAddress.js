import React from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import { connect } from 'react-redux';
import CartPincode from './cartPincode';

const styles = require('./Cart.scss');

const mapStateToProps = ({ pincode }) => ({
  pincode: pincode.selectedPincode
});

class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    takePincode: false
  };
  render() {
    const { pincode } = this.props;
    return (
      <Row className={styles.pincodeCheck} type="block"  m="0" mb="0" mt="0" style={{padding:'0px 20px 0px 0px'}}>
        {this.state.takePincode ? (
          <Div pr="0" pl="0">
            <CartPincode />
          </Div>
        ) : (
          <Div col="12" pr="0" pl="20px" pt="20px" pb="20px" className={styles.address_wrapper}>
            <div className={styles.address_container}>
              <div className={styles.filtered_address}>
                Deliver To: {pincode}
              </div>
            </div>
            <Button style={{backgroundColor:'none', textTransform:'none', height:'0px'}} fontSize="14px" color="#F47020" btnType="link" p="0" pl="5px">
              <div
                onClick={() => {
                  this.setState({ takePincode: true });
                }}
              >
                Change
              </div>
            </Button>
          </Div>
        )}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(DeliveryAddress);
