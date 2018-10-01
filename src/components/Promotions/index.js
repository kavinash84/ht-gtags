import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';

const mapStateToProps = ({ services }) => ({
  ...services.promotions
});

const Promotions = ({ results }) => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Promotions" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      {results.items &&
        results.items.text && (
        <div>
          <Text
            color="rgba(0,0,0,0.5)"
            fontSize="0.875rem"
            mb="1rem"
            ml="2.125rem"
            dangerouslySetInnerHTML={{ __html: results.items.text }}
          />
        </div>
      )}
    </Container>
  </Section>
);

Promotions.defaultProps = {
  results: {}
};

Promotions.propTypes = {
  results: PropTypes.object
};
export default connect(mapStateToProps)(Promotions);
