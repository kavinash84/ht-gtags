import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';

const styles = require('./index.scss');

const CloseIcon = require('../../../static/close-icon.svg');

const OfferRibbon = ({
  title, url, onClick, showRibbon
}) => (
  <Section bg="offerRibbon" className={showRibbon ? '' : styles.hide} mb="0.3125rem" pt="4px" pb="4px">
    {url === '' ? (
      <Text mt="0" mb="0" ta="center" color="#222222">
        {title}
      </Text>
    ) : (
      <Link to={url}>
        <Text mt="0" mb="0" ta="center" color="#222222">
          {title}
        </Text>
      </Link>
    )}
    <button className={styles.closeBtn} onClick={onClick}>
      <img src={CloseIcon} alt="Close" />
    </button>
  </Section>
);

OfferRibbon.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  showRibbon: PropTypes.bool
};

OfferRibbon.defaultProps = {
  showRibbon: true
};

export default OfferRibbon;
