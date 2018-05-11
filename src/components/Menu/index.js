import React from 'react';
import NavBar from 'components/NavBar';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import TopBar from './TopBar';

const styles = require('./Menu.scss');

const Menu = () => (
  <Section mb="0" p="0" pt="15px" className={styles.menuContainer}>
    <Container pr="0" pl="0">
      <TopBar />
      <NavBar />
    </Container>
  </Section>
);

export default Menu;
