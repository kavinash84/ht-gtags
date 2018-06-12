import React from 'react';
import LoginForm from 'components/Login/LoginForm';
import Fav from 'components/Icons/Fav';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import { SIGNUP_URL } from 'helpers/Constants';

// const FavIcon = require('../../../static/fav-icon.svg');
const GoogleIcon = require('../../../static/google-icon.png');
const styles = require('./LoginModal.scss');

const LoginModal = () => (
  <div className={styles.loginModal}>
    <Row mr="0" ml="0">
      <Div col="12">
        <Label display="block" className={styles.title}>
          <Fav fill="#ae8873" />
          Login to proceed further
        </Label>
      </Div>
    </Row>
    <Row display="block" mt="1.5rem" mr="0" ml="0">
      <Div col="12" ta="center">
        <button className="socialBtn">
          <Img display="inline-block" src={GoogleIcon} alt="Google" /> Google
        </button>
      </Div>
      <Div col="12" mb="1.25rem" mt="1.25rem">
        <Label display="block" ta="center" color="primary" fontWeight="400">
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
        <Link to="/">
          <Label fontWeight="light" color="primary">
            Forgot Password?
          </Label>
        </Link>
      </Div>
      <Div col="6" ta="right">
        <Link to={SIGNUP_URL}>
          <Label fontWeight="light" color="primary">
            New User? Sign Up now
          </Label>
        </Link>
      </Div>
    </Row>
  </div>
);

export default LoginModal;
