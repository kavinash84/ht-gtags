import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import TitleBar from 'components/TitleBar';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';

const mapStateToProps = ({ services }) => ({
  ...services.promotions
});

/* eslint-disable react/no-danger */
const Promotions = ({ data }) => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    {/* <TitleBar title="Promotions" /> */}
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      {data.items && data.items.text && (
        <BoxHtV1
          color="rgba(0,0,0,0.5)"
          fontSize="0.875rem"
          mb="1rem"
          ml="2.125rem"
          dangerouslySetInnerHTML={{ __html: data.items.text }}
        />
      )}
    </ContainerHtV1>
  </SectionHtV1>
);

Promotions.defaultProps = {
  data: {}
};

Promotions.propTypes = {
  data: PropTypes.object
};
export default connect(mapStateToProps)(Promotions);
