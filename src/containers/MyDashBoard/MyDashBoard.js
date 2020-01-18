import React from 'react';

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
import MyDashBoardContainer from 'newComponents/MyDashBoard';

const MyDashBoard = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container>
        <Row width={1} sx={{ borderBottom: 'divider' }} mx={0}>
          <Heading fontSize={20} pb={10}>
            Hello Matthew
          </Heading>
        </Row>
        <Row>
          <Col variant="col-2" pr={30}>
            <MyMenu page="profile" />
          </Col>
          <Col variant="col-10" px={30} py={30} sx={{ borderLeft: 'divider' }}>
            <MyDashBoardContainer />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default MyDashBoard;
