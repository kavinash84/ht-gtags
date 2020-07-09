import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

export default class ForgotPasswordForm extends Component {
  render() {
    const {
      email,
      onChangeEmail,
      emailFeedBackError,
      emailFeedBackMessage,
      onSubmitForgot,
      forgotResponse
    } = this.props;
    const { loading } = forgotResponse;
    return (
      <form onSubmit={onSubmitForgot}>
        <BoxHtV1
          sx={{
            backgroundColor: 'white',
            minHeight: 320,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 40px'
          }}
        >
          <BoxHtV1>
            <Heading
              mb={20}
              sx={{
                color: 'textPrimary',
                fontFamily: 'HelveticaNeue',
                fontSize: '24px',
                lineHeight: '29px',
                textAlign: 'center'
              }}
            >
              Forgot your password?
            </Heading>
          </BoxHtV1>
          <LabelHtV1
            mb={40}
            sx={{
              color: 'textPrimary',
              fontFamily: 'HelveticaNeue',
              fontSize: '17px',
              lineHeight: '20px',
              textAlign: 'center'
            }}
          >
            Enter your email address or phone number below and we will send you OTP to reset your password.
          </LabelHtV1>
          <RowHtV1 mb={20}>
            <Flex mr={60}>
              <BoxHtV1 as="input" type="radio" mr={10} />
              <LabelHtV1>E-mail</LabelHtV1>
            </Flex>
            <Flex>
              <BoxHtV1 as="input" type="radio" mr={10} />
              <LabelHtV1>Phone no.</LabelHtV1>
            </Flex>
          </RowHtV1>
          <BoxHtV1 width={1}>
            <FormInputHtV1
              type="text"
              placeholder=""
              onChange={onChangeEmail}
              value={email}
              feedBackError={emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
            />
          </BoxHtV1>
          <RowHtV1 ml={0} mr={0} mt={20} justifyContent="space-between" alignItems="center">
            <BoxHtV1 col="4">
              <ButtonHtV1 width={150} height={42} fontWeight={600} disabled={loading}>
                {forgotResponse && !loading ? 'SUBMIT' : 'Please wait...'}
              </ButtonHtV1>
            </BoxHtV1>
          </RowHtV1>
        </BoxHtV1>
      </form>
    );
  }
}

ForgotPasswordForm.defaultProps = {
  email: '',
  emailFeedBackError: false,
  emailFeedBackMessage: '',
  forgotResponse: {},
  onChangeEmail: () => {},
  onSubmitForgot: () => {}
};

ForgotPasswordForm.propTypes = {
  onChangeEmail: PropTypes.func,
  onSubmitForgot: PropTypes.func,
  email: PropTypes.string,
  emailFeedBackError: PropTypes.bool,
  emailFeedBackMessage: PropTypes.string,
  forgotResponse: PropTypes.object
};
