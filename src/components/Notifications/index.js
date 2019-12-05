import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import { Label } from 'hometown-components-dev/lib/Label';
import Section from 'hometown-components-dev/lib/Section';

const styles = require('./Notifications.scss');

const Notifications = ({ msg, type }) => (
  <Div type="block">
    <Section mb="0" pb="0" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Label
              color="textExtraDark"
              fontFamily="regular"
              fontSize="1rem"
              display="block"
              className={`${styles.alert} ${type === 'error' ? styles.alertError : styles.alertSuccess}`}
              mb="0"
              mt="0"
            >
              {msg}
            </Label>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
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
