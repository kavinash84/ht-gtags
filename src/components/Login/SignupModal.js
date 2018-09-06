import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Fav from 'hometown-components/lib/Icons/Fav';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import { googleLogin } from 'redux/modules/login';

const mapStateToProps = ({ app }) => ({
  session: app.sessionId
});

const mapDispatchToProps = dispatch => bindActionCreators({ loginViaLogin: googleLogin }, dispatch);

const styles = require('./LoginModal.scss');

const SignupModal = () => (
  <div className={styles.signupModal}>
    <Row mr="0" ml="0">
      <Div col="12">
        <Label display="block" className={styles.title}>
          <Fav fill="#f98d29" />
          Sign Up
        </Label>
      </Div>
    </Row>
    <Row display="block" mr="0" ml="0">
      <Div>
        <SignupForm />
      </Div>
    </Row>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModal);
