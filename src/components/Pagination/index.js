import React, { Component } from 'react';
import Pager from 'react-js-pagination';
import PropTypes from 'prop-types';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import { getProductCount } from 'selectors/products';
import { formFilterLink2 } from 'utils/helper';

@connect(state => ({
  location: state.router.location,
  productCount: getProductCount(state),
  pageno: state.pagination.page
}))
export default class Pagination extends Component {
  handleClick = pagenumber => {
    if (window) window.scrollTo(0, 0);
    const { history, categoryquery } = this.props;
    const [, b64] = history.location.search.split('?filters=');
    const link = formFilterLink2(pagenumber, 'Pagination', b64, categoryquery);
    history.push(link);
  };
  render() {
    const { pageno, productCount, pageRangeDisplayed } = this.props;
    return (
      <Section className="paginationWrapper" mb="0" pt="0" pb="0">
        <Container pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Div ta="center">
              <Pager
                activePage={parseInt(pageno, 10)}
                itemsCountPerPage={30}
                totalItemsCount={productCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={this.handleClick}
              />
            </Div>
          </Row>
        </Container>
      </Section>
    );
  }
}
Pagination.defaultProps = {
  pageno: 1,
  productCount: 32
};

Pagination.propTypes = {
  history: PropTypes.object.isRequired,
  pageno: PropTypes.number,
  productCount: PropTypes.number,
  categoryquery: PropTypes.string.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired
};
