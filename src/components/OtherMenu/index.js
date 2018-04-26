import React from 'react';
import Container from 'hometown-components/lib/Container';

const styles = require('./OtherMenu.scss');

const OtherMenu = () => (
  <div className={styles.otherMenuContainer}>
    <Container type="container" pr="1rem" pl="1rem">
      <div className={styles.back}>
        <a href="#back">
          <img src="http://via.placeholder.com/20x20" alt="" />
        </a>
      </div>
      <div className={styles.rightBLock}>
        <a href="#back">
          <img src="http://via.placeholder.com/20x20" alt="" />
        </a>
        <a href="#back">
          <img src="http://via.placeholder.com/20x20" alt="" />
        </a>
      </div>
    </Container>
  </div>
);

export default OtherMenu;
