import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Shimmer, BackgroundMasker } from 'hometown-components/lib/Shimmer';

const LoaderShimmer = () => (
  <Div type="block">
    <Shimmer height="1000px">
      <BackgroundMasker width="100%" height="15px" top="30px" />
      <BackgroundMasker width="calc((100% - 1170px) / 2)" height="calc(15px + 40px + 10px)" top="30px" />
      <BackgroundMasker width="calc((100% - 1170px) / 2)" height="calc(15px + 40px + 10px)" top="30px" right="0" />
      <BackgroundMasker width="60px" height="40px" top="calc(30px + 15px)" left="calc(((100% - 1170px) / 2) + 140px)" />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px)"
      />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px)"
      />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 120px)"
      />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 110px)"
      />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 24px)"
      />
      <BackgroundMasker
        width="60px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 48px)"
      />
      <BackgroundMasker width="60px" height="40px" top="calc(30px + 15px)" right="calc((100% - 1170px) / 2) + 24px" />
      <BackgroundMasker width="100%" height="10px" top="calc(30px + 15px + 40px)" />
    </Shimmer>
  </Div>
);

export default LoaderShimmer;
