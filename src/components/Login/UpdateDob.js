import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { FeedBackMessage } from 'hometown-components/lib/Label';

// Custom Components
import DatePicker from 'components/Form/DatePicker';

const formatDate = date => {
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

class UpdateDob extends Component {
  state = {
    showDobInput: false
  };
  render() {
    const { showDobInput } = this.state;
    const {
      session,
      // skipBirthdateCheck,
      birthdateCheck,
      onChangeDob,
      dob,
      dobError,
      dobErrorMessage,
      loginViaLogin,
      LoaderIcon,
      loggingIn
    } = this.props;

    return (
      <div>
        <Row display="block" mr="0" ml="0" mb="10px">
          <div col="12" ta="center">
            <Heading color="color676767" mt="0" mb={20} fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
              Update Profile
            </Heading>
            <Text color="color67676" ta="center" mb={20}>
              'Your wallet is not created. Would you like to create a wallet?'
            </Text>
            {showDobInput ? (
              <Div>
                <Div mb="0.625rem">
                  <DatePicker dateFormat="dd/MM/yyyy" selected={formatDate(dob)} onSelect={onChangeDob} />

                  {dobError && <FeedBackMessage type="error">{dobErrorMessage}</FeedBackMessage>}
                </Div>
                <button
                  style={dobError ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                  disabled={dobError}
                  className="google-login-btn"
                  onClick={() => {
                    const dobValue = moment(dob).format('YYYY-MM-DD');
                    loginViaLogin({}, session, null, null, dobValue, false);
                  }}
                >
                  {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
                  {loggingIn ? 'Please Wait' : 'Update'}
                </button>
              </Div>
            ) : (
              <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  style={{ margin: '0 10px' }}
                  className="google-login-btn"
                  onClick={() => this.setState({ showDobInput: true })}
                >
                  Yes
                </button>
                <button
                  style={{ margin: '0 10px' }}
                  className="google-login-btn"
                  onClick={() => {
                    loginViaLogin({}, session, null, null, null, true);
                    birthdateCheck(true);
                  }}
                >
                  No
                </button>
              </Div>
            )}
          </div>
        </Row>
      </div>
    );
    //   }
    //   return (
    //     <Div style={{ display: 'flex' }}>
    //       <button
    //         style={{ margin: '0 10px' }}
    //         className="google-login-btn"
    //         onClick={() => this.setState({ showDobInput: true })}
    //       >
    //         Yes
    //       </button>
    //       <button
    //         style={{ margin: '0 10px' }}
    //         className="google-login-btn"
    //         onClick={() => {
    //           loginViaLogin({}, session, null, null, dob);
    //           birthdateCheck(true);
    //         }}
    //       >
    //         No
    //       </button>
    //     </Div>
    //   );
  }
}

UpdateDob.defaultProps = {
  dob: '',
  dobErrorMessage: '',
  session: '',
  LoaderIcon: ''
};

UpdateDob.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  dob: PropTypes.instanceOf(Date),
  dobError: PropTypes.bool.isRequired,
  dobErrorMessage: PropTypes.string,
  session: PropTypes.string,
  birthdateCheck: PropTypes.string.isRequired,
  LoaderIcon: PropTypes.string
};

export default UpdateDob;
