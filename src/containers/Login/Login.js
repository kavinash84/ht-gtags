import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MenuFooter from 'containers/MenuFooter';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';

/* ====== Page Components ====== */
import LoginFormContainer from './LoginForm';

@withRouter
export default class LoginForm extends Component {
  render() {
    return (
      <SectionHtV1 p="0" mb="0">
        <MenuFooter pageTitle="Login">
          <div>
            <ContainerHtV1 pr="0" pl="0">
              <BoxHtV1 p="3rem 0">
                <LoginFormContainer />
              </BoxHtV1>
            </ContainerHtV1>
          </div>
        </MenuFooter>
      </SectionHtV1>
    );
  }
}
