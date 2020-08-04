import React from 'react';
import { provideHooks } from 'redial';
import { loadMyOrders } from 'redux/modules/orders';
import { loadUserProfile } from 'redux/modules/profile';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import MyOrderContainer from 'components/MyOrder';
import DashboardHeader from './../DashbordHeader/Header';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      profile: { loaded }
    } = getState();
    if (!loaded) {
      await dispatch(loadUserProfile()).catch(error => console.log(error));
    }
    const {
      profile: {
        data: { contact_number: contactNumber = '' }
      }
    } = getState();
    await dispatch(loadMyOrders(contactNumber)).catch(error => console.log(error));
  }
};
const MyAddress = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={20}>
        <DashboardHeader />
        <Row>
          <Col variant="col-2" pr={30}>
            <MyMenu page="Profile - My Orders" />
          </Col>
          <Col variant="col-10" px={30} py={30} sx={{ borderLeft: 'divider' }}>
            <MyOrderContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default provideHooks(hooks)(MyAddress);
