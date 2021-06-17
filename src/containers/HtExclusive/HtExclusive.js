import React from 'react';
import Container from 'hometown-components-dev/lib/ContainerHtV1';

import Logo from 'components/HtExclusive/Logo';
import HtExclusiveTemplate1 from 'components/HtExclusive/HtExclusiveTemplate1';
import HtExclusiveTemplate2 from 'components/HtExclusive/HtExclusiveTemplate2';
// import HtExclusiveTemplate3 from 'components/HtExclusive/HtExclusiveTemplate3';
// import HtExclusiveTemplate4 from 'components/HtExclusive/HtExclusiveTemplate4';
// import Menu from 'newComponents/Menu';
import Footer from 'newComponents/Footer';

import htExclusiveData from '../../data/ht-exclusive';

function HtExclusive() {
  const {
    section1, section2, section3, section4, section5
  } = htExclusiveData;

  return (
    <Container pt="50px" px="0">
      {/* <Menu /> */}
      <Logo />
      <HtExclusiveTemplate1 data={section1} />
      <HtExclusiveTemplate2 data={section2} />
      <HtExclusiveTemplate2 data={section3} />
      <HtExclusiveTemplate2 data={section4} />
      <HtExclusiveTemplate1 data={section5} />
      {/* <HtExclusiveTemplate3 data={section6} />
      <HtExclusiveTemplate4 data={section7} /> */}
      <Footer />
    </Container>
  );
}

export default HtExclusive;
