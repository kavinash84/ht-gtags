import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';

const mapStateToProps = ({ services }) => ({
  ...services.promotions
});

/* eslint-disable react/no-danger */
const Promotions = ({ data }) => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Promotions" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      {data.items &&
        data.items.text && (
        <div
          color="rgba(0,0,0,0.5)"
          fontSize="0.875rem"
          mb="1rem"
          ml="2.125rem"
          dangerouslySetInnerHTML={{ __html: data.items.text }}
        />
      )}
    </Container>
  </Section>
);

Promotions.defaultProps = {
  data: {}
};

Promotions.propTypes = {
  data: PropTypes.object
};
export default connect(mapStateToProps)(Promotions);
