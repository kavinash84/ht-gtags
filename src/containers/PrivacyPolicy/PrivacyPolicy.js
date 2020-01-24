import React from 'react';
import PrivacyPolicyContainer from 'components/StaticPages/PrivacyPolicy';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <MenuFooter
    pageTitle="Privacy Policy - Hometown.in"
    seoDescription="We take special care in valuing the trust of our beloved customers.
       Visit the privacy policy page at Hometown to know more about the privacy policy."
  >
    <PrivacyPolicyContainer />
  </MenuFooter>
);
