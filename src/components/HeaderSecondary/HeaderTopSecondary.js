import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* ====== Helpers ====== */
import { HOME_URL } from 'helpers/Constants';

/* ====== Components ====== */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Step from './Step';

const LogoIcon = require('../../../static/logo.png');

const HeaderTopSecondary = ({ shippingStep, paymentStep }) => (
  <Row alignItems="center" mr={[0, 0, 0, -16]} ml={[0, 0, 0, -16]}>
    <Col width={3 / 12}>
      <Link to={HOME_URL}>
        <Image height={['auto', 'auto', 50]} src={LogoIcon} alt="Hometown" HtV1 />
      </Link>
    </Col>
    <Col width={6 / 12}>
      <Flex justifyContent="space-between" alignItems="center" width={200} mx="auto">
        <Step value={1} variant={shippingStep} text="Shipping Details" />
        <Step
          value={2}
          variant={paymentStep}
          text="Payment Details"
          sxContainer={{ right: 40, left: 'unset' }}
          sx={{ ml: 'auto' }}
        />
      </Flex>
    </Col>
  </Row>
);

HeaderTopSecondary.defaultProps = {
  shippingStep: 'active',
  paymentStep: 'default'
};

HeaderTopSecondary.propTypes = {
  shippingStep: PropTypes.string,
  paymentStep: PropTypes.string
};

export default HeaderTopSecondary;
