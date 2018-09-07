import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import LoginForm from 'components/Login/LoginForm';
import GoogleLoginBtn from 'components/Login/GoogleLogin';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import { SIGNUP_URL, FORGOT_PASSWORD_URL } from 'helpers/Constants';

const SidebarImg = require('../../../static/login-side-thumb.png');

export default class LoginFormContainer extends Component {
  render() {
    const styles = require('./index.scss');

    return (
      <Section p="0" mb="0">
        <Menu />
        <div className="wrapper">
          <Container pr="0" pl="0">
            <div className={styles.userWrapper}>
              <Row display="block" mr="0" ml="0">
                <Div col={5}>
                  <div className={styles.imgWrapper}>
                    <Div>
                      <Heading color="white" fontSize="1.375rem">
                        LOGIN
                      </Heading>
                      <Text color="white">
                        Get access to your Orders, <br />Wishlist and Recommendations
                      </Text>
                    </Div>
                    <Img src={SidebarImg} />
                  </div>
                </Div>
                <Div col={7} p="2rem 3.5rem" bg="#f8f8f8">
                  <div className={styles.formBlock}>
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
                      <Div mt="0.675rem">
                        <LoginForm />
                      </Div>
                    </Row>
                    <Row display="block" mr="0" ml="0" pt="0.625rem">
                      <Div col="5">
                        <Link to={FORGOT_PASSWORD_URL}>
                          <Label color="primary">Forgot Password?</Label>
                        </Link>
                      </Div>
                      <Div col="7" ta="right">
                        <Link to={SIGNUP_URL}>
                          <Label fontFamily="regular" color="primary">
                            New User? Sign Up Now
                          </Label>
                        </Link>
                      </Div>
                    </Row>
                  </div>
                  {/* <Row display="block" mr="0" ml="0" pt="0.3125rem">
                    <Div col="12">
                      <Label fontFamily="medium" color="error" display="block" ta="center">
                        Message
                      </Label>
                    </Div>
                  </Row> */}
                </Div>
              </Row>
            </div>
          </Container>
        </div>
        <Footer />
      </Section>
    );
  }
}
