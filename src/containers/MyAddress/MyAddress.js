import React from 'react';
import { provideHooks } from 'redial';

import Body from 'hometown-components-dev/lib/BodyHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import MyAddressContainer from 'components/MyAddress';
import { loadMyAddress } from 'redux/modules/myaddress';
import DashboardHeader from './../DashbordHeader/Header';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyAddress()).catch(error => console.log(error));
  }
};
const MyAddress = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={[[40, 40, 60]]}>
        <DashboardHeader />
        <Row>
          <Box variant="col-2" pr={30}>
            <MyMenu page="My Addresses" />
          </Box>
          <Box variant="col-10" px={30} py={20} sx={{ borderLeft: 'divider' }}>
            <MyAddressContainer />
          </Box>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default provideHooks(hooks)(MyAddress);
