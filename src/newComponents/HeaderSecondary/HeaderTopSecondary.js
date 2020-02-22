import React from 'react';
import { Link } from 'react-router-dom';

/* ====== Helpers ====== */
import { HOME_URL } from 'helpers/Constants';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

const LogoIcon = require('../../../static/logo@2x.png');

const HeaderTopSecondary = () => (
  <Box>
    <Row alignItems="center" mr={[0, 0, -16]} ml={[0, 0, -16]}>
      <Col width={3 / 12}>
        <Link to={HOME_URL}>
          <Image height={28} src={LogoIcon} alt="Hometown" HtV1 />
        </Link>
      </Col>
    </Row>
  </Box>
);

export default HeaderTopSecondary;
