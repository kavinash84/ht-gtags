import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';

const styles = require('./index.scss');

const CloseIcon = require('../../../static/close-icon-white.svg');

const ReloadNotification = ({ title, onClick, showRibbon }) => (
  <Section bg="reloadRibbion" className={showRibbon ? '' : styles.hide} mb="0.3125rem" pt="4px" pb="4px">
    <Text mt="0" mb="0" ta="center" color="white" fontSize="14px">
      {title}
      <Button btnType="link" fontSize="12px" color="#FFF">
        Click here to reload
      </Button>
    </Text>
    <button className={styles.closeBtn} onClick={onClick}>
      <img src={CloseIcon} alt="Close" />
    </button>
  </Section>
);

ReloadNotification.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  showRibbon: PropTypes.bool
};

ReloadNotification.defaultProps = {
  showRibbon: true
};

export default ReloadNotification;
