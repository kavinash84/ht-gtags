import React from 'react';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import MyMenu from 'newComponents/MyMenu';
import ProfileForm from 'newComponents/ProfileForm';
import UpdatePasswordForm from 'containers/UpdatePassword';

const ProfileContainer = () => (
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
          <Box variant="col-2" pr={30}>
            <MyMenu page="profile" />
          </Box>
          <Box variant="col-10" pl={30} sx={{ borderLeft: 'divider' }}>
            <Box
              px={30}
              py={30}
              mt={30}
              width={7 / 10}
              sx={{
                boxShadow: 'profile',
                border: 'divider'
              }}
            >
              <ProfileForm />
              <UpdatePasswordForm />
            </Box>
          </Box>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default ProfileContainer;
