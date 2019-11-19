import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ====== Components ====== */
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';

/* ====== Page Components ====== */
import HeaderTop from 'newComponents/Header/HeaderTop';
import HoverMenuBox from 'newComponents/HoverBox/HoverMenuBox';
import NavBar from 'newComponents/NavBar';

@connect(({ homepage }) => ({
  menuItems: homepage.menu.data
}))
export default class Header extends Component {
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
    const styles = require('./Header.scss');
    console.log(hoverBox, currentMenuData, menuItems);

    return (
      <BoxHtV1 className={styles.menuContainer}>
        <ContainerHtV1 pr="0" pl="0">
          <HeaderTop />
        </ContainerHtV1>
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
      </BoxHtV1>
    );
  }
}

Header.defaultProps = {
  menuItems: []
};
Header.propTypes = {
  menuItems: PropTypes.array
};
