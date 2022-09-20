import React, { Component } from 'react';
import Pager from 'react-js-pagination';
import PropTypes from 'prop-types';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
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
    const { history, categoryquery, pageno } = this.props;
    if (pageno === pagenumber) {
      return;
    }
    // if (window) window.scrollTo(0, 0);

    const [, b64] = history.location.search.split('?filters=');

    let link;
    if (history.location.pathname === '/search/') {
      let [, searchQuery] = history.location.search.split('q=');
      [searchQuery] = searchQuery.split('&filters');
      link = formFilterLink2(searchQuery, 'searchPagination', '', categoryquery, pagenumber);
      return history.push(link);
    }
    link = formFilterLink2(pagenumber, 'Pagination', b64, categoryquery);
    history.push(link);
  };
  render() {
    const { pageno, productCount, pageRangeDisplayed } = this.props;
    return (
      <Section className="paginationWrapper" mb="0" pt="0" pb="0">
        <Container pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Box ta="center">
              <Pager
                activePage={parseInt(pageno, 10)}
                itemsCountPerPage={32}
                totalItemsCount={productCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={this.handleClick}
              />
            </Box>
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
