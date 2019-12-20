import React, { Component } from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import { HOME_URL } from 'helpers/Constants';
import { Link } from 'react-router-dom';

export default class MenuWithLogoOnly extends Component {
  render() {
    const styles = require('./MenuWithLogoOnly.scss');
    const LogoIcon = require('../../../static/logo.png');

    return (
      <SectionHtV1 mb="0" p="0" pt="15px" of="initial" className={styles.menuContainer}>
        <ContainerHtV1 pr="0" pl="0">
          <BoxHtV1 className={styles.hamburger}>
            <BoxHtV1 col="2">
              <BoxHtV1 className={styles.logoWrapper}>
                <Link to={HOME_URL}>
                  <ImageHtV1 src={LogoIcon} alt="Hometown" />
                </Link>
              </BoxHtV1>
            </BoxHtV1>
          </BoxHtV1>
        </ContainerHtV1>
      </SectionHtV1>
    );
  }
}
