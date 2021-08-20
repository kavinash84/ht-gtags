import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
// import Row from 'hometown-components-dev/lib/RowHtV1';
// import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import WalletTransactions from 'components/MyHomeWallet/WalletTransactions';
// import DashboardHeader from '../DashbordHeader/Header';
// import FuturePayModal from 'components/MyHomeWallet/FuturePayModal';
import ResponsiveModal from 'components/Modal';

import { getFuturePayProfile } from 'selectors/userprofile';
import { linkFuturePay, loadUserProfile } from 'redux/modules/profile';
import { birthdateCheck, getOtp, resendOtp } from 'redux/modules/login';

// import { linkFuturePay, setFuturePayStatus as toggleFuturePayModal } from 'redux/modules/profile';
import { formatAmount } from 'utils/formatters';
import { allowNChar, allowTypeOf } from 'utils/helper';
import Row from 'hometown-components-dev/lib/RowHtV1';

const MidBanner = require('../../../static/banners/mid-banner1.jpeg');

const styles = require('./HtWallet.scss');

@connect(({ profile, userLogin }) => ({
  profile: profile.data,
  futurPayProfile: getFuturePayProfile(profile),
  futurPay: profile.futurePayStatus,
  loggingIn: userLogin.loggingIn,
  loggedIn: userLogin.isLoggedIn
}))
export class MyHomeWallet extends Component {
  static propTypes = {
    futurPayProfile: PropTypes.shape({
      AvailableBalance: PropTypes.number,
      TopUpBalance: PropTypes.number,
      status: PropTypes.bool
    }),
    profile: PropTypes.object,
    loggingIn: PropTypes.bool,
    loggedIn: PropTypes.bool
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    futurPayProfile: { AvailableBalance: 0, TopUpBalance: 0, status: false },
    profile: {},
    loggingIn: false,
    loggedIn: false
  };

  state = {
    otp: '',
    otpErrorMessage: 'OTP Should be 6 Characters',
    resend: false,
    resendtimer: 30,
    open: false,
    validAge: false
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    dispatch(loadUserProfile());
    this.ageCheck();
  }

  componentDidUpdate(nextProps, prevState) {
    if (this.state.open && this.state.open !== prevState.open) {
      const timerref = setInterval(() => {
        if (this.state.resendtimer <= 1) {
          clearInterval(this.state.timerref);
        }
        this.setState(prevstate => ({
          resendtimer: prevstate.resendtimer - 1
        }));
      }, 1000);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ timerref });
    }
  }

  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    this.setState({
      open: false
    });
    const { dispatch } = this.context.store;
    dispatch(linkFuturePay({ OTP: otp }));
  };

  onChangeOtp = e => {
    const { value } = e.target;
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      otp: value,
      otpError: false
    });
  };

  handleResend = () => {
    this.setState({
      // mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    const {
      profile: { mobile = 0 }
    } = this.props;
    dispatch(resendOtp(mobile));
  };

  handleModal = (value = false) => {
    this.setState({
      open: value
    });
  };

  ageCheck = () => {
    const { dob } = this.props.profile;
    const newDob = moment(dob, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
    this.setState({
      validAge: myAge > 10
    });
  };

  render() {
    const {
      futurPayProfile: { AvailableBalance: balance, status },
      profile: { mobile = 0 },
      loggingIn,
      loggedIn
    } = this.props;
    const {
 otp, otpError, otpErrorMessage, resend, resendtimer, open, validAge
} = this.state;
    return (
      <div className="wrapper dummy">
        {/* <Menu /> */}
        <Header />
        <Row mr={0} ml={0} p="0px 1rem" pt={40} sx={{ maxWidth: '1180px' }} m="auto">
          <Box width={[3 / 12, 3 / 12, 2 / 12]} pr={30}>
            <MyMenu page="hometownwallet" />
          </Box>
          <Box width={[9 / 12, 9 / 12, 10 / 12]} pl={30} sx={{ borderLeft: 'divider' }}>
            <Section mt="1.5rem">
              <Container pl="1.563rem" pr="1.563rem">
                {status === 'success' ? (
                  <Box>
                    <Text sx={{ textAlign: 'center' }} mb="1rem" fontSize="2rem">
                      Total Balance
                    </Text>
                    <Text
                      sx={{ textAlign: 'center' }}
                      color="orangered"
                      mb="1rem"
                      mt="0"
                      fontFamily="medium"
                      fontSize="3rem"
                    >
                      ₹ {formatAmount(balance)}
                    </Text>
                  </Box>
                ) : (
                  <Box mt={60} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Text textAlign="center" mt="0" fontFamily="medium" fontSize="14px">
                      <Text mb={20}>Currently you dont have wallet would you like to create it ?</Text>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          disabled={!validAge}
                          onClick={() => {
                            const { dispatch } = this.context.store;
                            // dispatch(toggleFuturePayModal(true));
                            if (validAge) {
                              this.handleModal(true);
                              dispatch(birthdateCheck(false));
                              // dispatch(getOtp(mobile));
                            }
                          }}
                        >
                          Create Wallet
                        </Button>
                      </Box>
                    </Text>
                  </Box>
                )}

                {/* <FuturePayModal /> */}
                {!validAge ? (
                  <Text textAlign="center" mt={20}>
                    Note: User should be atleast 10 years old to create Wallet
                  </Text>
                ) : null}

                <ResponsiveModal
                  classNames={{
                    overlay: 'futurePayModalModal',
                    modal: 'futurePayModal'
                  }}
                  onCloseModal={() => this.handleModal(false)}
                  open={open}
                >
                  <Box>
                    <Heading
                      ellipsis={false}
                      color="rgba(0.0.0.0.8)"
                      textAlign="center"
                      fontSize="1.125rem"
                      mb="1rem"
                      mt="1rem"
                      lh="1.5"
                      fontFamily="light"
                    >
                      We've sent an otp to your registered mobile
                    </Heading>
                    <Box textAlign="center">
                      <form onSubmit={this.onSubmitOtp}>
                        <FormInput
                          label="OTP"
                          onChange={this.onChangeOtp}
                          value={otp}
                          type="text"
                          placeholder="******"
                          feedBackError={otpError}
                          feedBackMessage={otpErrorMessage}
                        />
                        <Button
                          btnType="primary"
                          size="block"
                          boder="solid 1px rgba(151,151,151,0.47)"
                          fontFamily="regular"
                          height="38px"
                          mt="0"
                          ml="-1px"
                          onClick={this.onSubmitOtp}
                          disabled={loggingIn}
                        >
                          SUBMIT
                        </Button>
                      </form>
                      {!resend && (
                        <Button
                          boder="solid 1px rgba(151,151,151,0.47)"
                          fontFamily="regular"
                          height="30px"
                          mt="5px"
                          ml="-1px"
                          pt="0"
                          pb="0"
                          onClick={this.handleResend}
                          disabled={resendtimer > 0}
                        >
                          RESEND OTP {resendtimer > 0 ? resendtimer : ''}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </ResponsiveModal>
              </Container>
            </Section>
            {/* Mid banner */}
            {!loggedIn ? (
              <Box mt="2.25rem" mb="1.5rem" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image className={styles.midBanner} src={MidBanner} alt="MidBanner" />
              </Box>
            ) : null}

            {/* Transaction history */}
            <Box bg="#F7F7F7">
              <Container pl="1.563rem" pr="1.563rem" pt="0.7rem">
                <Box>
                  <Text fontFamily="medium" fontSize="14px" mt="1rem" mb="1rem">
                    Transaction History
                  </Text>
                  <WalletTransactions />
                </Box>
              </Container>
            </Box>
          </Box>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default MyHomeWallet;

// const MyHomeTownWallet = () => (
//   <Wrapper>
//     <Body>
//       {/* Header */}
//       <Header />

//       {/* Container */}
//       <Container pt={[40, 40, 40, 60]}>
//         <DashboardHeader />
//         <Row mr={0} ml={0}>
//           <Box width={[3 / 12, 3 / 12, 2 / 12]} pr={30}>
//             <MyMenu page="hometownwallet" />
//           </Box>
//           <Box width={[9 / 12, 9 / 12, 10 / 12]} pl={30} sx={{ borderLeft: 'divider' }}>
//             <Box
//               px={30}
//               py={30}
//               mt={30}
//               width={[1, 1, 8 / 10, 7 / 10]}
//               sx={{
//                 boxShadow: 'profile',
//                 border: 'divider'
//               }}
//             >
//               <MyWalletContainer />
//             </Box>
//           </Box>
//         </Row>
//       </Container>

//       {/* Footer */}
//       <Footer />
//     </Body>
//   </Wrapper>
// );

// export default MyHomeTownWallet;
