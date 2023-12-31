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
import MyOrderContainer from 'components/MyOrder';
import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import DashboardHeader from './../DashbordHeader/Header';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      profile: { loaded }
    } = getState();
    if (!loaded) {
      await dispatch(loadUserProfile());
    }
    const {
      profile: {
        data: { contact_number: contactNumber }
      }
    } = getState();
    await dispatch(loadMyOrders(contactNumber));
  }
};
const OrderAndReturns = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={[40, 40, 40, 60]}>
        <DashboardHeader />
        <Row>
          <Col width={[3 / 12, 3 / 12, 2 / 12]} pr={30}>
            <MyMenu page="Profile - My Orders" />
          </Col>
          <Col width={[9 / 12, 9 / 12, 10 / 12]} px={30} py={30} sx={{ borderLeft: 'divider' }}>
            <MyOrderContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default provideHooks(hooks)(OrderAndReturns);
