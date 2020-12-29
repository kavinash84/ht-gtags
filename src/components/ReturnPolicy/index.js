import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import Container from 'hometown-components/lib/Container';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
// import Section from 'hometown-components/lib/Section';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
// import TitleBar from 'components/TitleBar';

const mapStateToProps = ({ services }) => ({
  ...services.returnpolicy
});

/* eslint-disable react/no-danger */
const ReturnPolicy = ({ data }) => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    {/* <TitleBar title="Return Policy" /> */}
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      {data.items && data.items.text && (
        <div
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

ReturnPolicy.defaultProps = {
  data: {}
};

ReturnPolicy.propTypes = {
  data: PropTypes.object
};

export default connect(mapStateToProps)(ReturnPolicy);
