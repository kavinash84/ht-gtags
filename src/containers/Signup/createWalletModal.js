import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveModal from 'components/Modal';

// Components
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import OtpGenerator from './otpGenerator';

class CreateWalletModal extends Component {
  state = {
    sendOtp: false
  };
  render() {
    const { sendOtp } = this.state;
    const {
 showModal, handleModal, handleNo, handleYes, mobile
} = this.props;

    return (
      <ResponsiveModal
        classNames={{
          overlay: 'futurePayModalModal',
          modal: 'futurePayModal'
        }}
        onCloseModal={() => {
          handleModal();
          this.setState({ sendOtp: false });
        }}
        open={showModal}
      >
        <div>
          <Row display="block" mr="0" ml="0" mb="10px">
            <div col="12" ta="center">
              <Heading
                color="color676767"
                mt="0"
                mb="20px"
                fontWeight="400"
                fontSize="26px"
                ta="center"
                fontFamily="light"
              >
                Update Profile
              </Heading>
              <Text color="color676767" ta="center" mb="20px">
                'Your wallet is not created. Would you like to create a wallet?'
              </Text>
              {sendOtp ? (
                <Div>
                  <OtpGenerator mobile={mobile} handleSubmit={handleYes} />
                </Div>
              ) : (
                <Div style={{ display: 'flex' }}>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => this.setState({ sendOtp: true })}
                  >
                    Yes
                  </button>
                  <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => handleNo()}>
                    No
                  </button>
                </Div>
              )}
            </div>
          </Row>
        </div>
      </ResponsiveModal>
    );
  }
}

CreateWalletModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired
};

export default CreateWalletModal;
