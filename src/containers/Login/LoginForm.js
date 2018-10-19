import React, { Component } from 'react';
import LoginForm from 'components/Login/LoginForm';
import GoogleLoginBtn from 'components/Login/GoogleLogin';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

export default class LoginFormContainer extends Component {
  render() {
    const styles = require('./index.scss');
    return (
      <div className={styles.userWrapper}>
        <Row display="block" mr="0" ml="0">
          <Div col={6}>
            <div className={styles.imgWrapper}>
              <ImageShimmer
                src="https://static.hometown.in/media/cms/hometownnew/compressed/signup-sidebar-bg.jpg"
                height="599px"
              >
                {imageURL => <Img src={imageURL} alt="" />}
              </ImageShimmer>
            </div>
          </Div>
          <Div col={6} p="2rem 3rem">
            <div className={styles.formBlock}>
              <Row display="block" mt="1.5rem" mr="0" ml="0">
                <Div col="12" ta="center">
                  <Heading
                    color="color676767"
                    mt="0"
                    mb="0"
                    fontWeight="400"
                    fontSize="2rem"
                    ta="center"
                    fontFamily="light"
                  >
                    Sign in to your account
                  </Heading>
                  <Text color="color676767" ta="center">
                    To track your orders, manage your account and more.
                  </Text>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0" pb="3rem">
                <Div mt="0.675rem">
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
    );
  }
}
