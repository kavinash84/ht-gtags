import React from 'react';
import PropTypes from 'prop-types';
// import Div from 'hometown-components/lib/Div';

const styles = require('./Slider.scss');

const ProductItem = ({ itemData, contentStatus, typeOfSlider }) => (
  <li className={typeOfSlider}>
    <a className={styles.link} href={itemData.url}>
      {typeOfSlider !== 'menuSlider' && <img src={itemData.image} alt={itemData.title} />}
      {contentStatus && (
        <div className={styles.content}>
          <p className={styles.title}>{itemData.name}</p>
        </div>
      )}
    </a>
  </li>
);

ProductItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  contentStatus: PropTypes.bool.isRequired,
  typeOfSlider: PropTypes.string.isRequired
};

export default ProductItem;
