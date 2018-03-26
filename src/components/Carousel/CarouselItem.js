import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./Slider.scss');

const CarouseItem = ({
  itemData, img, contentStatus, typeOfSlider
}) => (
  <div className={typeOfSlider === 'productSlider' ? styles.prodSliderItem : ''}>
    <img src={img} alt={itemData.title} />
    {contentStatus && (
      <div className={styles.content}>
        <p className={styles.title}>{itemData.title}</p>
        {typeOfSlider === 'productSlider' && (
          <div>
            <div className={`${styles.priceWrapper} taLeft`}>
              <span className={styles.discPrice}>Rs. {itemData.disc_price}</span>
              <span className={styles.price}>Rs. {itemData.price}</span>
              <span className={styles.saving}>
                Saving Rs. {itemData.saving} ({itemData.percentage})
              </span>
            </div>
            <div className={styles.rating}>{itemData.rating}</div>
            <div className={styles.tags}>{itemData.tags}</div>
          </div>
        )}
      </div>
    )}
  </div>
);

CarouseItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  img: PropTypes.string.isRequired,
  contentStatus: PropTypes.bool.isRequired,
  typeOfSlider: PropTypes.string.isRequired
};

export default CarouseItem;
