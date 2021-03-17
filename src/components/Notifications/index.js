import React from 'react';
import PropTypes from 'prop-types';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';

const styles = require('./Notifications.scss');

const Notifications = ({ msg, type }) => (
  <BoxHtV1 type="block">
    <SectionHtV1 mb="0" pb="0" pr="0.5rem" pl="0.5rem">
      <ContainerHtV1 type="container" pr="0" pl="0">
        <RowHtV1 display="block" mr="0" ml="0">
          <BoxHtV1 col="12">
            <LabelHtV1
              color="textExtraDark"
              fontFamily="regular"
              fontSize="1rem"
              display="block"
              className={`${styles.alert} ${type === 'error' ? styles.alertError : styles.alertSuccess}`}
              mb="0"
              mt="0"
            >
              {msg}
            </LabelHtV1>
          </BoxHtV1>
        </RowHtV1>
      </ContainerHtV1>
    </SectionHtV1>
  </BoxHtV1>
);

Notifications.defaultProps = {
  msg: '',
  type: 'success'
};

Notifications.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string
};

export default Notifications;
