import React, { Component } from 'react';
/* ====== Components ====== */
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import MenuFooter from 'containers/MenuFooter';

/* ====== Page Components ====== */
import SignupFormContainer from './SignupForm';

export default class Signup extends Component {
  render() {
    return (
      <SectionHtV1 p="0" mb="0">
        <MenuFooter pageTitle="Signup and get Rs.500 coupon">
          <div>
            <ContainerHtV1 pr="0" pl="0">
              <BoxHtV1 p="3rem 0">
                <SignupFormContainer />
              </BoxHtV1>
            </ContainerHtV1>
          </div>
        </MenuFooter>
      </SectionHtV1>
    );
  }
}
