import React from 'react';
// import { connect } from 'react-redux';
// <<<<<<< HEAD
// import { PropTypes } from 'prop-types';

// /* ====== Modules ====== */
// import { login, getOtp, resendOtp } from 'redux/modules/login';

// /* ====== Helpers ====== */
// =======
// import LoginForm from 'hometown-components/lib/Forms/LoginForm';
// import Row from 'hometown-components/lib/Row';
// import Heading from 'hometown-components/lib/Heading';
// import Img from 'hometown-components/lib/Img';
// import Div from 'hometown-components/lib/Div';
// import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
// import ResponsiveModal from 'components/Modal';
// import { validateEmail, isBlank } from 'js-utility-functions';
// import { validateMobile, isEmpty, checkSpecialChar } from 'utils/validation';
// >>>>>>> old-fe/production
// import { allowNChar, allowTypeOf } from 'utils/helper';

// /* ====== Validations ====== */
// import { validateMobile } from 'utils/validation';

// /* ====== Components ====== */
// import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
// import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
// import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
// import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
// import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
// import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
// import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';

// /* ====== Page Components ====== */
// import LoginForm from 'components/Login/LoginForm';
// import GoogleLoginBtn from 'components/Login/GoogleLogin';
// import LoginViaOtp from 'components/Login/LoginViaOtp';

// const OTPIcon = require('../../../static/otp.svg');
// const EmailIcon = require('../../../static/email-primary.svg');

// @connect(state => ({
//   loginResponse: state.userLogin,
//   router: state.router,
//   getotpError: state.userLogin.otpError,
//   getotpErrorMessage: state.userLogin.errorMessage,
//   otpSent: state.userLogin.otpSent,
//   loaded: state.userLogin.loaded,
//   loading: state.userLogin.loading,
//   loggingIn: state.userLogin.loggingIn,
//   askContact: state.userLogin.askContact,
//   loginType: state.userLogin.loginType
// }))
// export default class LoginFormContainer extends Component {
//   static propTypes = {
// <<<<<<< HEAD
//     getotpError: PropTypes.bool,
//     getotpErrorMessage: PropTypes.string,
//     otpSent: PropTypes.bool,
//     loaded: PropTypes.bool,
//     loading: PropTypes.bool,
//     loggingIn: PropTypes.bool,
//     askContact: PropTypes.bool,
//     loginType: PropTypes.string
// =======
//     loginResponse: PropTypes.shape({
//       isLoggedIn: PropTypes.bool.isRequired
//     }).isRequired,
//     askContact: PropTypes.bool.isRequired,
//     askName: PropTypes.bool.isRequired,
//     loginType: PropTypes.string.isRequired,
//     loggingIn: PropTypes.bool.isRequired
// >>>>>>> old-fe/production
//   };
//   static contextTypes = {
//     store: PropTypes.object.isRequired
//   };
//   static defaultProps = {
//     otpSent: false,
//     getotpError: false,
//     getotpErrorMessage: '',
//     loaded: false,
//     loading: false,
//     loggingIn: false,
//     askContact: false,
//     loginType: ''
//   };

//   state = {
// <<<<<<< HEAD
//     loginviaotp: false,
//     mobile: '',
//     otp: '',
//     otpErrorMessage: 'OTP Should be 6 Characters',
//     mobilesubmitted: false,
//     resend: false
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!this.state.mobilesubmitted && nextProps.getotpError && nextProps.getotpErrorMessage.includes('resend')) {
//       this.setState({
//         mobilesubmitted: true
//       });
//     }
//     if (nextProps.otpSent && nextProps.otpSent !== this.props.otpSent) {
//       this.setState({
//         mobilesubmitted: true
//       });
//     }
//   }
//   onChangeMobile = e => {
//     const { value } = e.target;
//     const checkError = !validateMobile(value);
//     if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
//       return;
//     }
// =======
//     email: '',
//     emailError: false,
//     emailErrorMessage: '',
//     password: '',
//     passwordError: false,
//     passwordErrorMessage: '',
//     phone: '',
//     phoneError: false,
//     phoneErrorMessage: 'Please enter valid 10 digit phone number',
//     name: '',
//     nameError: false,
//     nameErrorMessage: 'Please enter a name without special characters'
//   };

//   onChangeEmail = e => {
//     const {
//       target: { value }
//     } = e;
//     const checkError = validateEmail(value, 'Please enter a valid email');
// >>>>>>> old-fe/production
//     this.setState({
//       mobile: value,
//       mobileError: checkError,
//       mobileErrorMessage:
//         value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
//     });
//   };

//   onChangeOtp = e => {
//     const { value } = e.target;
//     if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
//       return;
//     }
//     this.setState({
//       otp: value,
//       otpError: false
//     });
//   };
//   onSubmitMobileNumber = e => {
//     e.preventDefault();
// <<<<<<< HEAD
//     const { mobile, resend } = this.state;
//     const checkmobile = !validateMobile(mobile);
//     if (checkmobile) {
//       return this.setState({
//         mobileError: true,
//         mobileErrorMessage: 'Please Enter Valid Mobile Number'
// =======
//     const {
//       email, password, phone, name
//     } = this.state;
//     const checkEmail = validateEmail(email, 'Invalid Email');
//     const checkMobile = phone ? !validateMobile(phone) : false;
//     const checkName = !isEmpty(name) ? checkSpecialChar(name) : false;
//     const checkPassword = isBlank(password);
//     if (checkEmail.error || checkPassword || checkMobile || checkName) {
//       return this.setState({
//         nameError: checkName,
//         emailError: checkEmail.error,
//         emailErrorMessage: checkEmail.errorMessage,
//         passwordError: checkPassword,
//         passwordErrorMessage: checkPassword ? "Password can't be blank" : ''
// >>>>>>> old-fe/production
//       });
//     }
//     const { dispatch } = this.context.store;
//     if (resend) {
//       return dispatch(resendOtp(this.state.mobile));
//     }
//     dispatch(getOtp(this.state.mobile));
//   };
//   onSubmitOtp = e => {
//     e.preventDefault();
//     const { otp } = this.state;
//     if (otp.length < 6) {
//       return this.setState({
//         otpError: true
//       });
//     }
//     const { dispatch } = this.context.store;
//     dispatch(login(this.state));
//   };
//   handleResend = () => {
//     this.setState({
//       mobilesubmitted: false,
//       resend: true
//     });
//   };
// <<<<<<< HEAD
//   toggleLoginForm = () => {
//     this.setState({
//       loginviaotp: !this.state.loginviaotp,
//       resend: false,
//       mobilesubmitted: false
//     });
// =======
//   onChangeName = e => {
//     const {
//       target: { value }
//     } = e;
//     const checkError = isEmpty(value) || checkSpecialChar(value);
//     this.setState({
//       name: value,
//       nameError: checkError
//     });
//   };
//   isValid = () => {
//     const { askContact, askName } = this.props;
//     const { phone, name } = this.state;
//     const isInvalidPhone = askContact && !validateMobile(phone);
//     const isInvalidName = askName && (isEmpty(name) || checkSpecialChar(name));
//     const disabled = isInvalidPhone || isInvalidName;
//     return disabled;
//   };
//   handleModal = () => {
//     const { dispatch } = this.context.store;
//     dispatch(clearLoginState());
// >>>>>>> old-fe/production
//   };

//   render() {
//     const {
// <<<<<<< HEAD
//       mobile,
//       mobileError,
//       mobileErrorMessage,
//       otp,
//       otpError,
//       otpErrorMessage,
//       mobilesubmitted,
//       resend
//     } = this.state;
//     const {
//  loaded, loading, loggingIn, askContact, loginType
// } = this.props;

//     return (
//       <BoxHtV1>
//         <RowHtV1 display="block" mr="0" ml="0">
//           <BoxHtV1 variant="col-5">
//             <ImageShimmer
//               src="https://static.hometown.in/media/cms/hometownnew/compressed/signup-sidebar-bg.jpg"
//               height="520px"
//             >
//               {imageURL => <ImageHtV1 height="520px" src={imageURL} alt="" />}
//             </ImageShimmer>
//           </BoxHtV1>
//           <BoxHtV1 variant="col-7" p="1.5rem 2.5rem 0.5rem 2.5rem">
//             <RowHtV1>
//               <RowHtV1 display="block" mt="rem" mr="0" ml="0">
//                 <BoxHtV1 variant="col-12" ta="center">
//                   <HeadingHtV1
//                     color="color676767"
//                     mt="0"
//                     mb="0"
//                     fontWeight="400"
//                     fontSize="26px"
//                     ta="center"
//                     fontFamily="light"
//                   >
//                     Sign in to your account
//                   </HeadingHtV1>
//                   <TextHtV1 color="color676767" ta="center">
//                     To track your orders, manage your account and more.
//                   </TextHtV1>
//                 </BoxHtV1>
//               </RowHtV1>
//               <RowHtV1 display="block" mr="0" ml="0" pb="0">
//                 <BoxHtV1 mt="0.675rem">
//                   {!this.state.loginviaotp ? (
//                     <LoginForm askContact={askContact} loginType={loginType} loading={loading} />
//                   ) : (
//                     <LoginViaOtp
//                       onChangeMobile={this.onChangeMobile}
//                       onChangeOtp={this.onChangeOtp}
//                       onSubmitMobileNumber={this.onSubmitMobileNumber}
//                       onSubmitOtp={this.onSubmitOtp}
//                       otp={otp}
//                       otpError={otpError}
//                       otpErrorMessage={otpErrorMessage}
//                       mobile={mobile}
//                       mobileError={mobileError}
//                       mobileErrorMessage={mobileErrorMessage}
//                       mobilesubmitted={mobilesubmitted}
//                       loaded={loaded}
//                       loading={loading}
//                       loggingIn={loggingIn}
//                       handleResend={this.handleResend}
//                       resend={resend}
//                     />
//                   )}
//                 </BoxHtV1>
//               </RowHtV1>
//               <RowHtV1 display="block" mr="0" ml="0" pt="1.25rem">
//                 <BoxHtV1 variant="col-12" ta="center" mb="0.625rem">
//                   <LabelHtV1 fontFamily="regular" ta="center" color="color79716c" fontSize="1rem" va="middle">
//                     Or continue with
//                   </LabelHtV1>
//                 </BoxHtV1>
//                 <BoxHtV1 variant="col-6" ta="center" mb="0" pr="0.625rem">
//                   <ButtonHtV1
//                     btnType="custom"
//                     fontFamily="regular"
//                     ta="center"
//                     color="black"
//                     mr="0.3125rem"
//                     fontSize="0.825rem"
//                     va="middle"
//                     border="1px solid #e6e6e6"
//                     size="block"
//                     height="42px"
//                     bg="#FFF"
//                     onClick={this.toggleLoginForm}
//                   >
//                     {!this.state.loginviaotp ? (
//                       <ImageHtV1 display="inline-block" src={OTPIcon} alt="OTP" va="sub" width="18px" mr="10px" />
//                     ) : (
//                       <ImageHtV1 display="inline-block" src={EmailIcon} alt="OTP" va="sub" width="18px" mr="10px" />
//                     )}
//                     {!this.state.loginviaotp ? 'OTP' : 'Login Via Email Id'}
//                   </ButtonHtV1>
//                 </BoxHtV1>
//                 <BoxHtV1 variant="col-6" ta="center" mb="0" pl="0.625rem">
//                   <GoogleLoginBtn askContact={askContact} loginType={loginType} loading={loading} />
//                 </BoxHtV1>
//               </RowHtV1>
//             </RowHtV1>
//             {/* <RowHtV1 display="block" mr="0" ml="0" pt="0.3125rem">
//               <BoxHtV1 variant="col-12">
//                 <LabelHtV1 fontFamily="medium" color="error" display="block" ta="center">
//                   Message
//                 </LabelHtV1>
//               </BoxHtV1>
//             </RowHtV1> */}
//           </BoxHtV1>
//         </RowHtV1>
//       </BoxHtV1>
// =======
//       email,
//       password,
//       emailError,
//       emailErrorMessage,
//       passwordError,
//       passwordErrorMessage,
//       phone,
//       phoneError,
//       phoneErrorMessage,
//       name,
//       nameError,
//       nameErrorMessage
//     } = this.state;
//     const {
//       loginResponse, askContact, askName, loginType, loggingIn
//     } = this.props;
//     const open = (askContact || askName) && loginType && loginType === 'hometown';
//     const isValidField = this.isValid();
//     return (
//       <div>
//         <LoginForm
//           email={email}
//           onChangeEmail={this.onChangeEmail}
//           emailFeedBackError={emailError}
//           emailFeedBackMessage={emailErrorMessage}
//           password={password}
//           onChangePassword={this.onChangePassword}
//           passwordFeedBackError={passwordError}
//           passwordFeedBackMessage={passwordErrorMessage}
//           onSubmitLogin={this.onSubmitLogin}
//           loginResponse={loginResponse}
//           signupUrl={SIGNUP_URL}
//           forgotUrl={FORGOT_PASSWORD_URL}
//         />
//         <ResponsiveModal classNames={{ modal: 'updateProfileModal' }} onCloseModal={this.handleModal} open={open}>
//           <Row display="block" mr="0" ml="0" mb="10px">
//             <Div col="12" ta="center">
//               <Heading
//                 color="color676767"
//                 mt="0"
//                 mb="0"
//                 fontWeight="400"
//                 fontSize="26px"
//                 ta="center"
//                 fontFamily="light"
//               >
//                 {'Update Profile'}
//               </Heading>
//               <Text color="color676767" ta="center">
//                 {/* eslint-disable */}
//                 {askName && askContact
//                   ? 'Please update your contact number and name!'
//                   : askName
//                   ? 'Please update your name !'
//                   : askContact
//                   ? 'Please update your contact number!'
//                   : ''}
//               </Text>
//             </Div>
//           </Row>
//           <Div ta="center">
//             <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
//               <form
//                 onSubmit={this.onSubmitLogin}
//                 id="custom_form"
//                 name="custom_form"
//                 encType="multipart/form-data"
//                 className="bulk-order-form"
//               >
//                 {askName && (
//                   <FormInput
//                     label=""
//                     type="text"
//                     placeholder="Enter your name"
//                     onChange={this.onChangeName}
//                     value={name}
//                     feedBackError={nameError}
//                     feedBackMessage={nameErrorMessage}
//                   />
//                 )}
//                 {askContact && (
//                   <FormInput
//                     label=""
//                     type="text"
//                     placeholder="Enter your contact number!"
//                     onChange={this.onChangePhone}
//                     value={phone}
//                     feedBackError={phoneError}
//                     feedBackMessage={phoneErrorMessage}
//                   />
//                 )}
//               </form>
//               <button
//                 style={isValidField ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
//                 disabled={isValidField}
//                 className="google-login-btn"
//                 onClick={e => {
//                   console.log('ok');
//                   this.onSubmitLogin(e);
//                 }}
//               >
//                 {loggingIn ? (
//                   <span>
//                     Please Wait
//                     <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
//                   </span>
//                 ) : (
//                   'Update'
//                 )}
//               </button>
//             </Text>
//           </Div>
//         </ResponsiveModal>
//       </div>
// >>>>>>> old-fe/production
//     );
//   }
// }

const LoginDemo = () => <div> Demo Login </div>;

export default LoginDemo;
