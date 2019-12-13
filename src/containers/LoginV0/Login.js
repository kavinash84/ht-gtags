import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MenuFooter from 'containers/MenuFooter';
import Container from 'hometown-components-dev/lib/Container';
import Section from 'hometown-components-dev/lib/Section';
import Div from 'hometown-components-dev/lib/Div';
import LoginFormContainer from './LoginForm';

@withRouter
export default class LoginForm extends Component {
  render() {
    return (
      <Section p="0" mb="0">
        <MenuFooter pageTitle="Login">
          <div className="wrapper">
            <Container pr="0" pl="0">
              <Div p="3rem 0">
                <LoginFormContainer />
              </Div>
            </Container>
          </div>
        </MenuFooter>
      </Section>
    );
  }
}
