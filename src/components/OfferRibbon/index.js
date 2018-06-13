import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';

const CloseIcon = require('../../../static/close-icon.svg');
const styles = require('./OfferRibbon.scss');

const OfferRibbon = ({ title, url }) => (
  <Section bg="textDark">
    <Link to={url}>
      <Text mt="0" mb="0" ta="center" color="#FFF">
        {title}
      </Text>
    </Link>
    <button className={styles.closeBtn}>
      <img src={CloseIcon} alt="Close" />
    </button>
  </Section>
);

OfferRibbon.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default OfferRibbon;
