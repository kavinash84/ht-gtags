import React from 'react';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import MyMenu from 'components/MyMenu';
import ProfileForm from 'components/ProfileForm';
import UpdatePasswordForm from 'containers/UpdatePassword';

const ProfileContainer = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={[40, 40, 40, 60]}>
        <Row width={1} sx={{ borderBottom: 'divider' }} mx={0}>
          <Heading fontSize={20} pb={10}>
            Hello Matthew
          </Heading>
        </Row>
        <Row mr={0} ml={0}>
          <Box width={[3 / 12, 3 / 12, 2 / 12]} pr={30}>
            <MyMenu page="profile" />
          </Box>
          <Box width={[9 / 12, 9 / 12, 10 / 12]} pl={30} sx={{ borderLeft: 'divider' }}>
            <Box
              px={30}
              py={30}
              mt={30}
              width={[1, 1, 8 / 10, 7 / 10]}
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
