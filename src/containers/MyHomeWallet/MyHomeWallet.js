import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import Menu from 'components/MyMenu';
import WalletTransactions from 'components/MyHomeWallet/WalletTransactions';
import DashboardHeader from '../DashbordHeader/Header';

import { getFuturePayProfile } from 'selectors/userprofile';
import { formatAmount } from 'utils/formatters';

const MidBanner = require('../../../static/banners/mid-banner1.jpeg');

const styles = require('./HtWallet.scss');

@connect(({ profile }) => ({
  profile: profile.data,
  futurPayProfile: getFuturePayProfile(profile)
}))

export class MyHomeWallet extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const {
      futurPayProfile: { AvailableBalance: balance, TopUpBalance: limit }
    } = this.props;
    return (
      <div className="wrapper">
        <Menu />
        <Section mt="1.5rem">
          <Container pl="1.563rem" pr="1.563rem">
            <Box>
              <Text ta="center" mb="0.313rem" fontSize="14px">
                Total Balance
              </Text>
              <Text ta="center" mb="0" mt="0" fontFamily="medium" fontSize="24px">
                ₹ {formatAmount(balance)}
              </Text>
              <Text ta="center" mb="0.625rem" mt="0.625rem" fontSize="14px">
                Max limit: ₹ {formatAmount(limit)}
              </Text>
            </Box>
          </Container>
        </Section>

        {/* Mid banner */}
        <Box mt="2.25rem" mb="1.5rem">
          <Image className={styles.midBanner} src={MidBanner} alt="MidBanner" />
        </Box>

        {/* Transaction history */}
        <Box bg="#F7F7F7">
          <Container pl="1.563rem" pr="1.563rem">
            <Box>
              <Text fontFamily="medium" fontSize="14px">
                Transaction History
              </Text>
              <WalletTransactions />
            </Box>
          </Container>
        </Box>
        <Footer />
      </div>
    );
  }
}

export default MyHomeWallet

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
