import React from 'react';

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
import CouponsContainer from 'components/Coupons';
import DashboardHeader from './../DashbordHeader/Header';

const Coupons = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={64}>
        <DashboardHeader />
        <Row>
          <Col variant="col-2" pr={30}>
            <MyMenu page="coupens" />
          </Col>
          <Col variant="col-10" px={30} py={30} sx={{ borderLeft: 'divider' }}>
            <CouponsContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default Coupons;
