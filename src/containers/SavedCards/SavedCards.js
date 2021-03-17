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
import SavedCardsContainer from 'newComponents/SavedCards';
import DashboardHeader from './../DashbordHeader/Header';

const SavedCards = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={[40, 40, 40, 60]}>
        <DashboardHeader />
        <Row>
          <Col width={[3 / 12, 3 / 12, 2 / 12]} pr={30}>
            <MyMenu page="my dashboard" />
          </Col>
          <Col width={[9 / 12, 9 / 12, 10 / 12]} px={30} py={20} sx={{ borderLeft: 'divider' }}>
            <SavedCardsContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default SavedCards;
