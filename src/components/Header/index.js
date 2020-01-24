import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

/* ====== Page Components ====== */
import HeaderTop from 'components/Header/HeaderTop';
import TopBar from 'components/Header/TopBar';
import HoverMenuBox from 'components/HoverBox/HoverMenuBox';
import NavBar from 'components/NavBar';

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

    return (
      <Fragment>
        <TopBar />
        <Box pt={15} sx={{ borderBottom: 'solid 1px #727070' }}>
          <Container pr="0" pl="0" mb={10}>
            <HeaderTop />
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
        </Box>
      </Fragment>
    );
  }
}

Header.defaultProps = {
  menuItems: []
};
Header.propTypes = {
  menuItems: PropTypes.array
};
