import React, { Component } from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Section from 'hometown-components-dev/lib/Section';
import Div from 'hometown-components-dev/lib/Div';
import Img from 'hometown-components-dev/lib/Img';
import { HOME_URL } from 'helpers/Constants';
import { Link } from 'react-router-dom';

export default class MenuWithLogoOnly extends Component {
  render() {
    const styles = require('./MenuWithLogoOnly.scss');
    const LogoIcon = require('../../../static/logo.png');

    return (
      <Section mb="0" p="0" pt="15px" of="initial" className={styles.menuContainer}>
        <Container pr="0" pl="0">
          <div className={styles.hamburger}>
            <Div col="2">
              <div className={styles.logoWrapper}>
                <Link to={HOME_URL}>
                  <Img src={LogoIcon} alt="Hometown" />
                </Link>
              </div>
            </Div>
          </div>
        </Container>
      </Section>
    );
  }
}
