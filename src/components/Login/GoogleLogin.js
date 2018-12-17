import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Img from 'hometown-components/lib/Img';
import GoogleLoginBtn from 'react-google-login';
import { googleLogin } from 'redux/modules/login';

const mapStateToProps = ({ app }) => ({
  session: app.sessionId
});

const onSuccess = (dispatcher, session) => result => {
  dispatcher(result.tokenId, session);
};

const onError = error => e => {
  console.log(error, e);
};

const mapDispatchToProps = dispatch => bindActionCreators({ loginViaLogin: googleLogin }, dispatch);

const GoogleIcon = require('../../../static/google.svg');

const GoogleLogin = ({ loginViaLogin, session }) => (
  <GoogleLoginBtn
    className="socialBtn"
    clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
    onSuccess={onSuccess(loginViaLogin, session)}
    onFailure={onError}
  >
    <Img display="inline-block" src={GoogleIcon} alt="Google" va="sub" width="18px" mr="10px" /> GOOGLE
  </GoogleLoginBtn>
);

GoogleLogin.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleLogin);
