import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./HoverMenuBox.scss');

const HoverMenuBox = ({ handleEnter, handleLeave, menuData }) => (
  <div className={styles.menuBoxContainer}>
    <div className={styles.menuBox} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {menuData
        ? menuData.children.map(subCategory1 => (
          <div key={subCategory1.id}>
            <ul>{subCategory1.name}</ul>
            {subCategory1.children
              ? subCategory1.children.map(subCategory2 => <li key={subCategory2.id}>{subCategory2.name}</li>)
              : null}
          </div>
        ))
        : null}
    </div>
  </div>
);

HoverMenuBox.defaultProps = {
  menuData: []
};
HoverMenuBox.propTypes = {
  menuData: PropTypes.array,
  handleEnter: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired
};

export default HoverMenuBox;
