import React from 'react';
import Helmet from 'react-helmet';
import ReviewOrderContainer from 'components/Checkout/ReviewOrder';
import Menu from 'components/MenuWithLogoOnly';
import Section from 'hometown-components/lib/Section';

export default () => (
  <Section p="0rem" mb="0">
    <Helmet title="Review Order" />
    <div className="wrapper">
      <Menu />
      <ReviewOrderContainer />
    </div>
  </Section>
);
