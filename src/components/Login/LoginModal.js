import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from 'components/Login/LoginForm';
import Fav from 'hometown-components/lib/Icons/Fav';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import { SIGNUP_URL, FORGOT_PASSWORD_URL } from 'helpers/Constants';
import GoogleLogin from 'react-google-login';
import { googleLogin } from 'redux/modules/login';

const onSuccess = dispatcher => result => {
  dispatcher(result.tokenId);
};

const onError = error => {
  alert(error);
};

const mapDispatchToProps = dispatch => bindActionCreators({ loginViaLogin: googleLogin }, dispatch);

// const FavIcon = require('../../../static/fav-icon.svg');
const GoogleIcon = require('../../../static/google-icon.png');
const styles = require('./LoginModal.scss');

const LoginModal = ({ loginViaLogin }) => (
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
        <GoogleLogin
          className="socialBtn"
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin)}
          onFailure={onError}
        >
          <Img display="inline-block" src={GoogleIcon} alt="Google" /> Google
        </GoogleLogin>
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
        <Link to={FORGOT_PASSWORD_URL}>
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

LoginModal.propTypes = {
  loginViaLogin: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginModal);
