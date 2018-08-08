import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from 'components/NavBar';
import TopBar from 'components/TopBar/TopBar';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import HoverMenuBox from 'components/HoverBox/HoverMenuBox';

@connect(({ homepage }) => ({
  menuItems: homepage.menu.data
}))
export default class Menu extends Component {
  state = {
    currentMenu: '',
    hoverBox: false
  };

  setCurrentMenuData = () => {
    const menuData = this.props.menuItems.find(menu => menu.id === this.state.currentMenu);
    if (menuData.children) {
      if (menuData.children.length > 0) {
        this.setState({
          hoverBox: true,
          currentMenuData: menuData
        });
      }
    } else {
      this.setState({
        hoverBox: false,
        currentMenuData: menuData
      });
    }
  };

  exitOnClick = () => {
    this.setState({
      hoverBox: false
    });
  };

  enterMenu = id => () => {
    this.setState(
      {
        currentMenu: id
      },
      this.setCurrentMenuData
    );
  };

  leaveMenu = () => {
    this.setState({
      hoverBox: false,
      currentMenu: ''
    });
  };

  enterHoverBox = () => {
    this.setState({ hoverBox: true });
  };

  leaveHoverBox = () => {
    this.setState({
      hoverBox: false,
      currentMenu: '',
      currentMenuData: ''
    });
  };

  render() {
    const { hoverBox, currentMenuData } = this.state;
    const { menuItems } = this.props;
    const styles = require('./Menu.scss');

    return (
      <Section mb="0" p="0" pt="15px" of="initial" className={styles.menuContainer}>
        <Container pr="0" pl="0">
          <TopBar />
        </Container>
        <NavBar
          exitOnClick={this.exitOnClick}
          handleEnter={this.enterMenu}
          handleLeave={this.leaveMenu}
          menuItems={menuItems}
        />
        <Container pr="0" pl="0">
          {hoverBox && (
            <HoverMenuBox
              handleEnter={this.enterHoverBox}
              handleLeave={this.leaveHoverBox}
              menuData={currentMenuData}
              exitOnClick={this.exitOnClick}
            />
          )}
        </Container>
      </Section>
    );
  }
}

Menu.defaultProps = {
  menuItems: []
};
Menu.propTypes = {
  menuItems: PropTypes.array
};
