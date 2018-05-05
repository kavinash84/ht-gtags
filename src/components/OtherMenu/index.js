import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';

const styles = require('./OtherMenu.scss');
const BackIcon = require('../../../static/back.jpg');
const FilterIcon = require('../../../static/filter.jpg');
const SearchIcon = require('../../../static/search.jpg');

const OtherMenu = ({ filter, search, history }) => (
  <div className={styles.otherMenuContainer}>
    <Container type="container" pr="1rem" pl="1rem">
      <div className={styles.back}>
        <button onClick={history.goBack}>
          {' '}
          <img src={BackIcon} alt="backkkkk" />{' '}
        </button>
      </div>
      <div className={styles.rightBLock}>
        {filter && (
          <a href="#filter">
            <img src={FilterIcon} alt="filter" />
          </a>
        )}
        {search && (
          <a href="#search">
            <img src={SearchIcon} alt="search" />
          </a>
        )}
      </div>
    </Container>
  </div>
);

OtherMenu.defaultProps = {
  filter: false,
  search: false
};

OtherMenu.propTypes = {
  filter: PropTypes.bool,
  search: PropTypes.bool,
  history: PropTypes.object.isRequired
};

export default withRouter(OtherMenu);
