import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './CategoryBar';

const CategoryBar = ({ categoryBar }) => (
  <div className={style.categoryBar}>
    {categoryBar.map(item => (
      <Link to={`/${item.url_key}`} key={item.name}>
        <div>
          <img src={item.icon_url ? item.icon_url : '/'} alt={item.name} />
        </div>
      </Link>
    ))}
  </div>
);

CategoryBar.defaultProps = {
  categoryBar: []
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array
};
export default CategoryBar;
