import React, { Component } from 'react';
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
import MenuFooter from 'containers/MenuFooter';

const SearchEmptyIcon = require('../../../static/404.png');
const styles = require('./NotFound.scss');

const mapStateToProps = ({ homepage }) => ({
  menuItems: homepage.menu.data
});

class NotFound extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  };

  componentWillMount() {
    const { staticContext } = this.context.router;
    if (staticContext) {
      staticContext.statusCode = 404;
    }
  }
  render() {
    const { menuItems } = this.props;
    return (
      <div className="wrapper">
        <MenuFooter pageTitle="404 - Not Found">
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
                  menu.children &&
                    menu.visibility === 'on' && (
                    <Div col={2} key={menu.name}>
                      <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                        {menu.name}
                      </Heading>
                      <ul className={styles.catList}>
                        {menu.children.map(subMenu =>
                          subMenu.visibility === 'on' && (
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
        </MenuFooter>
      </div>
    );
  }
}
NotFound.defaultProps = {
  menuItems: []
};
NotFound.propTypes = {
  menuItems: PropTypes.array
};
export default connect(mapStateToProps)(NotFound);
