import React from 'react';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import Gratification from 'newComponents/Gratification';

const GratificationContainer = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={80}>
        <Row>
          <Box variant="col-10" width="968px">
            <Box
              mt={30}
              sx={{
                boxShadow: 'profile',
                border: 'divider'
              }}
            >
              <Gratification />
            </Box>
          </Box>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default GratificationContainer;
