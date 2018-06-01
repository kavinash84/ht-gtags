import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from 'components/NavBar';
import TopBar from 'components/TopBar/TopBar';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import HoverMenuBox from 'components/HoverBox/HoverMenuBox';
import { connect } from 'react-redux';

const styles = require('./index.scss');

@connect(state => ({
  menuItems: state.menu.data
}))
export default class MenuNew extends Component {
  state = {
    currentMenu: '',
    hoverBox: false
  };

  setCurrentMenuData = () => {
    const menuData = this.props.menuItems.find(this.searchCurrentMenuData);
    if (menuData.children) {
      if (menuData.children.length > 0) {
        this.setState({
          hoverBox: true
        });
      }
    } else {
      this.setState({
        hoverBox: false
      });
    }
    this.setState({
      currentMenuData: menuData
    });
  };

  searchCurrentMenuData = menu => menu.id === this.state.currentMenu;

  enterMenu = e => {
    this.setState(
      {
        currentMenu: e.target.id
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
    const { currentMenu, hoverBox, currentMenuData } = this.state;
    const { menuItems } = this.props;

    return (
      <Section mb="0" p="0" pt="15px" className={styles.menuContainer}>
        <Container pr="0" pl="0" onMouseLeave={this.leaveMenu}>
          <TopBar />
          <NavBar handleEnter={this.enterMenu} handleLeave={this.leaveMenu} menuItems={menuItems} />
          {hoverBox ? (
            <HoverMenuBox
              name={currentMenu}
              handleEnter={this.enterHoverBox}
              handleLeave={this.leaveHoverBox}
              menuData={currentMenuData}
            />
          ) : null}
        </Container>
      </Section>
    );
  }
}

MenuNew.defaultProps = {
  menuItems: []
};
MenuNew.propTypes = {
  menuItems: PropTypes.array
};
