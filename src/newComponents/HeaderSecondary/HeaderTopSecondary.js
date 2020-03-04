import React from 'react';
import { Link } from 'react-router-dom';

/* ====== Helpers ====== */
import { HOME_URL } from 'helpers/Constants';

/* ====== Components ====== */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Step from './Step';

const LogoIcon = require('../../../static/logo@2x.png');

const HeaderTopSecondary = () => (
  <Row alignItems="center" mr={[0, 0, 0, -16]} ml={[0, 0, 0, -16]}>
    <Col width={3 / 12}>
      <Link to={HOME_URL}>
        <Image height={['auto', 'auto', 24]} src={LogoIcon} alt="Hometown" HtV1 />
      </Link>
    </Col>
    <Col width={6 / 12}>
      <Flex justifyContent="center" alignItems="center">
        <Step value={1} variant="active" />
        <Step value={2} sxContainer={{ right: 0 }} sx={{ ml: 'auto' }} />
      </Flex>
    </Col>
  </Row>
);

export default HeaderTopSecondary;
