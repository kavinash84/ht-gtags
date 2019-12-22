import React from 'react';
import FaqContainer from 'components/StaticPages/Faqs';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <MenuFooter
    pageTitle="FAQs - Hometown.in"
    seoDescription="Have queries pertaining to questions that are most frequently asked by our customers.
     Visit our FAQs page at Hometown to know more."
  >
    <FaqContainer />
  </MenuFooter>
);
