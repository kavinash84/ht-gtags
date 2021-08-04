import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/* ====== Components ====== */
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

/* ====== Page Components ====== */
import FuturePayModal from 'components/MyHomeWallet/FuturePayModal';
import HoverMenuBox from '../HoverBox/HoverMenuBox';
import NavBar from '../NavBar';
import HeaderTop from './HeaderTop';
import TopBar from './TopBar';

const navigateToCategory = history => category => {
  history.push({
    pathname: `${category.pathname}`,
    search: `${category.search}`,
    state: {
      query: `${category.search}`,
      path: `${category.pathname}`,
      pincode: window.getPincode(),
      pinSetByUser: window.isPincodeFilter()
    }
  });
};
@connect(({ homepage }) => ({
  menuItems: homepage.menu.data
}))
class Header extends Component {
  state = {
    currentMenu: '',
    hoverBox: false
  };

  componentDidMount() {
    const { history } = this.props;

    window.HTCATEGORY = {};
    window.HTCATEGORY.navigateToCategory = navigateToCategory(history);
  }

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

  exitOnClick = event => {
    this.setState({
      hoverBox: false
    });
    event.preventDefault();
    window.HTCATEGORY.navigateToCategory({
      pathname: event.target.pathname,
      search: event.target.search
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

  clickMenu = id => () => {
    const { currentMenu } = this.state;
    if (currentMenu === id) {
      this.setState(
        {
          currentMenu: ''
        },
        this.setCurrentMenuData
      );
    } else {
      this.setState(
        {
          currentMenu: id
        },
        this.setCurrentMenuData
      );
    }
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
      <Box bg="white" sx={{ position: 'sticky', top: 0, zIndex: 30 }}>
        <TopBar />
        <Box pt={15} sx={{ borderBottom: 'solid 1px #727070' }}>
          <Container pr="0" pl="0" mb={10}>
            <HeaderTop />
          </Container>
          <NavBar
            exitOnClick={this.exitOnClick}
            handleEnter={this.enterMenu}
            handleClick={this.clickMenu}
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
        <FuturePayModal />
      </Box>
    );
  }
}

Header.defaultProps = {
  menuItems: []
};
Header.propTypes = {
  menuItems: PropTypes.array,
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
