import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const RoundCatItem = ({
  image, name, url, layout, layoutStyle
}) => (
  <Div
    className={`${styles.sliderItem}
  ${layoutStyle === 'grid' ? styles.grid : ''}
  ${layout === 'square' ? styles.square : styles.round}`}
  >
    <Link className={styles.link} to={url}>
      <ImageShimmer src={image} height="227px">
        {imageURL => <img src={imageURL} alt={name} />}
      </ImageShimmer>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
      </div>
    </Link>
  </Div>
);

RoundCatItem.defaultProps = {
  layoutStyle: 'slider',
  image: '',
  name: '',
  url: '',
  layout: ''
};

RoundCatItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  layout: PropTypes.string,
  layoutStyle: PropTypes.string
};

export default RoundCatItem;
