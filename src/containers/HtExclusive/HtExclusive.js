import React from 'react';
import Header from 'components/Header';
import Logo from 'components/HtExclusive/Logo';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import HtExclusiveTemplate1 from 'components/HtExclusive/HtExclusiveTemplate1';
import HtExclusiveTemplate2 from 'components/HtExclusive/HtExclusiveTemplate2';
import HtExclusiveTemplate3 from 'components/HtExclusive/HtExclusiveTemplate3';
import HtExclusiveTemplate4 from 'components/HtExclusive/HtExclusiveTemplate4';
import HtExclusiveTemplate5 from 'components/HtExclusive/HtExclusiveTemplate5';
import Footer from 'newComponents/Footer';

import htExclusiveData from '../../data/ht-exclusive';

function HtExclusive() {
  const {
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    // section9,
    // section10,
    section11
  } = htExclusiveData;

  return (
    <Box>
      <Header />
      <Logo />
      <HtExclusiveTemplate1 data={section1} />
      <HtExclusiveTemplate2 data={section2} />
      <HtExclusiveTemplate2 data={section3} />
      <HtExclusiveTemplate2 data={section4} />
      <HtExclusiveTemplate1 data={section5} />
      <HtExclusiveTemplate3 data={section6} />
      <HtExclusiveTemplate3 data={section7} />
      <HtExclusiveTemplate3 data={section8} />
      {/* <HtExclusiveTemplate4 data={section9} />
      <HtExclusiveTemplate4 data={section10} /> */}
      <HtExclusiveTemplate5 data={section11} />
      <Footer />
    </Box>
  );
}

export default HtExclusive;
