import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const SearchEmptyIcon = require('../../../static/404.png');
const styles = require('./NotFound.scss');

const mapStateToProps = ({ homepage }) => ({
  menuItems: homepage.menu.data
});

const NotFound = ({ menuItems }) => (
  <div className="wrapper">
    <Menu />
    <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
      <Empty
        title="Sorry no results found"
        subTitle="Please check the Spelling or by a different search"
        btnName="Go Back Home"
        url="/"
        bg="#fafafa"
      >
        <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
      </Empty>
    </Section>
    <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
      <Container pr="0" pl="0">
        <Row m="0">
          {menuItems.map(menu =>
            menu.children && (
              <Div col={2} key={menu.name}>
                <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                  {menu.name}
                </Heading>
                <ul className={styles.catList}>
                  {menu.children.map(subMenu => (
                    <li key={subMenu.name}>
                      <Link to={subMenu.url_key}>{subMenu.name}</Link>
                    </li>
                  ))}
                </ul>
              </Div>
            ))}
        </Row>
      </Container>
    </Section>
    <Footer />
  </div>
);
NotFound.defaultProps = {
  menuItems: []
};
NotFound.propTypes = {
  menuItems: PropTypes.array
};
export default connect(mapStateToProps)(NotFound);
