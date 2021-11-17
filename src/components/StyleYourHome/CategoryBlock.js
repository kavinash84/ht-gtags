import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Components ====== */
// import Box from 'hometown-components/lib/Div';
// import Flex from 'hometown-components/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
// import Text from 'hometown-components-dev/lib/TextHtV1';

const CategoryBlock = ({ src, to, title }) => (
  <div
    style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}
  >
    <Link to={to}>
      <div
        style={{
            width: '22rem',
            display: 'flex',
            height: '360px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}
      >
        <Image src={src} alt={title} height="auto" width="90%" style={{ zIndex: '10' }} />

        <div
          style={{
              background: '#F2F2F2',
              padding: '15px 10px',
              width: '85%',
              marginTop: '15px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bolder',
              opacity: '90%'
            }}
        >
          {title}
        </div>
      </div>
    </Link>
  </div>
  );

CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default CategoryBlock;
