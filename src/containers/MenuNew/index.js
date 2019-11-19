import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from 'newComponents/NavBar';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import HoverMenuBox from 'newComponents/HoverBox/HoverMenuBox';

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
    if (menuData) {
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
    } else {
      this.setState({
        hoverBox: false
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

    return (
      <SectionHtV1 mb="0" p="0" pt="15px" of="initial" variant="section.menuContainer">
        <NavBar
          exitOnClick={this.exitOnClick}
          handleEnter={this.enterMenu}
          handleLeave={this.leaveMenu}
          menuItems={menuItems}
        />
        <ContainerHtV1 pr="0" pl="0">
          {hoverBox && (
            <HoverMenuBox
              handleEnter={this.enterHoverBox}
              handleLeave={this.leaveHoverBox}
              menuData={currentMenuData}
              exitOnClick={this.exitOnClick}
            />
          )}
        </ContainerHtV1>
      </SectionHtV1>
    );
  }
}
Menu.defaultProps = {
  menuItems: []
};
Menu.propTypes = {
  menuItems: PropTypes.array
};
