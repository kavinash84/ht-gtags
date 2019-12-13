import React from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import MyMenu from 'components/MyMenu';
import ProfileForm from 'components/ProfileForm';
import UpdatePasswordForm from 'containers/UpdatePassword';
import MenuFooter from 'containers/MenuFooter';

const ProfileContainer = () => (
  <Div>
    <MenuFooter pageTitle="My Profile">
      <MyMenu page="profile" />
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0" p="2rem 0">
          <Div col="6" pr="3rem">
            <ProfileForm />
          </Div>
          <Div col="6" pl="3rem">
            <UpdatePasswordForm />
          </Div>
        </Row>
      </Container>
    </MenuFooter>
  </Div>
);

export default ProfileContainer;
