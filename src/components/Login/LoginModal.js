import React from 'react';
import LoginForm from 'components/Login/LoginForm';
import GoogleLoginBtn from 'components/Login/GoogleLogin';
import Fav from 'hometown-components-dev/lib/Icons/Fav';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import { Label } from 'hometown-components-dev/lib/Label';

const styles = require('./LoginModal.scss');

const LoginModal = () => (
  <div className={styles.loginModal}>
    <Row mr="0" ml="0">
      <Div col="12">
        <Label display="block" className={styles.title}>
          <Fav fill="#f98d29" />
          Login to proceed further
        </Label>
      </Div>
    </Row>
    <Row display="block" mr="0" ml="0" pb="2rem" pt="2rem">
      <Div>
        <LoginForm />
      </Div>
    </Row>
    <Row className={styles.socialLogin} display="block" mr="0" ml="0" pt="2.5rem">
      <Div col="12" ta="center" mb="0.625rem">
        <Label fontFamily="regular" ta="center" color="color79716c" mr="0.625rem" fontSize="1rem" va="super">
          Or continue with
        </Label>
        <GoogleLoginBtn />
      </Div>
    </Row>
  </div>
);

export default LoginModal;
