import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import WalletTransactions from 'components/MyHomeWallet/WalletTransactions';
// import DashboardHeader from '../DashbordHeader/Header';
import FuturePayModal from 'components/MyHomeWallet/FuturePayModal';

import { getFuturePayProfile } from 'selectors/userprofile';
import { setFuturePayStatus as toggleFuturePayModal } from 'redux/modules/profile';
import { birthdateCheck } from 'redux/modules/login';
import { formatAmount } from 'utils/formatters';
import Row from 'hometown-components-dev/lib/RowHtV1';

const MidBanner = require('../../../static/banners/mid-banner1.jpeg');

const styles = require('./HtWallet.scss');

@connect(({ profile }) => ({
  profile: profile.data,
  futurPayProfile: getFuturePayProfile(profile)
}))
export class MyHomeWallet extends Component {
  static propTypes = {
    futurPayProfile: PropTypes.shape({
      AvailableBalance: PropTypes.number,
      TopUpBalance: PropTypes.number,
      status: PropTypes.bool
    })
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    futurPayProfile: { AvailableBalance: 0, TopUpBalance: 0, status: false }
  };

  render() {
    const {
      futurPayProfile: { AvailableBalance: balance, TopUpBalance: limit, status }
    } = this.props;
    return (
      <div className="wrapper dummy">
        {/* <Menu /> */}
        <Header />
        <Row mr={0} ml={0} p="0px 1rem" pt={40} sx={{maxWidth: '1180px'}} m="auto">
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
                    <Text sx={{ textAlign: 'center' }} mb="0.625rem" mt="0.625rem" fontSize="1.5rem">
                      Max limit: ₹ {formatAmount(limit)}
                    </Text>
                  </Box>
                ) : (
                  <Box mt={60} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Text ta="center" mt="0" fontFamily="medium" fontSize="14px">
                      <Text mb={20}>Currently you dont have wallet would you like to create it ?</Text>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          onClick={() => {
                            const { dispatch } = this.context.store;
                            dispatch(toggleFuturePayModal(true));
                            dispatch(birthdateCheck(false));
                          }}
                        >
                          Create Wallet
                        </Button>
                      </Box>
                    </Text>
                  </Box>
                )}
                <FuturePayModal />
              </Container>
            </Section>
            {/* Mid banner */}
            <Box mt="2.25rem" mb="1.5rem" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image className={styles.midBanner} src={MidBanner} alt="MidBanner" />
            </Box>

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
