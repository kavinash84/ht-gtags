import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Menu from 'components/Menu';
import MyMenu from 'components/MyMenu';
import ProfileForm from 'components/ProfileForm';
import UpdatePasswordForm from 'components/UpdatePasswordForm';

export default class ProfileFormContainer extends Component {
  render() {
    return (
      <Div>
        <Menu />
        <MyMenu page="profile" />
        <Container type="container" pr="1rem" pl="1rem">
          <Row display="block" mr="0" ml="0" p="2rem 0">
            <Div col="6" pr="3rem">
              <ProfileForm />
            </Div>
            <Div col="6" pl="3rem">
              <UpdatePasswordForm />
            </Div>
          </Row>
        </Container>
      </Div>
    );
  }
}
