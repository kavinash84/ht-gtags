import React from 'react';
import LoginForm from 'components/Login/LoginForm';
import GoogleLoginBtn from 'components/Login/GoogleLogin';
import Fav from 'hometown-components/lib/Icons/Fav';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import { SIGNUP_URL, FORGOT_PASSWORD_URL } from 'helpers/Constants';

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
    <Row display="block" mt="1.5rem" mr="0" ml="0">
      <Div col="12" ta="center" mb="0.625rem">
        <GoogleLoginBtn />
      </Div>
      <Div col="12" mb="1" mt="1">
        <Label fontFamily="regular" display="block" ta="center" color="primary">
          OR
        </Label>
      </Div>
    </Row>
    <Row display="block" mr="0" ml="0">
      <Div>
        <LoginForm />
      </Div>
    </Row>
    <Row display="block" mr="0" ml="0" pt="0.625rem">
      <Div col="6">
        <Link to={FORGOT_PASSWORD_URL}>
          <Label fontFamily="regular" color="primary">
            Forgot Password?
          </Label>
        </Link>
      </Div>
      <Div col="6" ta="right">
        <Link to={SIGNUP_URL}>
          <Label fontFamily="regular" color="primary">
            New User? Sign Up now
          </Label>
        </Link>
      </Div>
    </Row>
  </div>
);

export default LoginModal;
