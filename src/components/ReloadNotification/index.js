import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import Refresh from 'hometown-components/lib/Icons/Refresh';

const styles = require('./index.scss');

const CloseIcon = require('../../../static/close-icon-white.svg');

const ReloadNotification = ({ title, onClick, showRibbon }) => (
  <Section bg="reloadRibbion" className={`${styles.reloadRibbion} ${showRibbon ? '' : styles.hideRibbon}`} mb="0" p="0">
    <Div pt="4px" pb="4px">
      <Text mt="0" mb="0" ta="center" color="white" fontSize="14px" fontFamily="light" lh="2">
        {title}
        <Button
          btnType="btnOutline"
          fontSize="12px"
          color="rgba(0,0,0,0.8)"
          bc="#FFF"
          border="1px solid"
          bg="transparent"
          p="0px 8px"
          ml="10px"
        >
          <Refresh fill="rgba(0,0,0,0.8)" width="14px" height="14px" />
          <Span color="rgba(0,0,0,0.8)">Reload</Span>
        </Button>
      </Text>
      <button className={styles.closeBtn} onClick={onClick}>
        <img src={CloseIcon} alt="Close" />
      </button>
    </Div>
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
