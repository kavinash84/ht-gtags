import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import { getProductCount } from 'selectors/products';

@connect(state => ({
  location: state.router.location,
  productCount: getProductCount(state),
  pageno: state.pagination.page
}))
export default class PaginationCon extends Component {
  handleClick = pagenumber => {
    const { history } = this.props;
    history.push(`?page=${pagenumber}`);
  };

  render() {
    const { pageno, productCount, pageRangeDisplayed } = this.props;
    return (
      <Section className="paginationWrapper" mb="0" pt="0" pb="0">
        <Container pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Div ta="center">
              <Pagination
                activePage={Number(pageno)}
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
PaginationCon.propTypes = {
  history: PropTypes.object.isRequired,
  pageno: PropTypes.number.isRequired,
  productCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired
};
