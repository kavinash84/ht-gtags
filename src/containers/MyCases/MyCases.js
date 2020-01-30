import React from 'react';
import { provideHooks } from 'redial';
import { loadMyCases } from 'redux/modules/mycases';
import { loadUserProfile } from 'redux/modules/profile';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import MyMenu from 'newComponents/MyMenu';
import MyCasesContainer from 'newComponents/MyCases';

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
        data: { salesforce_account_id: sfid, contact_number: cn }
      }
    } = getState();
    await dispatch(loadMyCases(sfid, '', '', '', cn));
  }
};
const MyCases = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={80}>
        <Row width={1} sx={{ borderBottom: 'divider' }} mx={0}>
          <Heading fontSize={20} pb={10}>
            Hello Matthew
          </Heading>
        </Row>
        <Row>
          <Col variant="col-2" pr={30}>
            <MyMenu page="my cases" />
          </Col>
          <Col variant="col-10" px={30} py={30} sx={{ borderLeft: 'divider' }}>
            <MyCasesContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default provideHooks(hooks)(MyCases);
