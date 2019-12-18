import React from 'react';
import Div from 'hometown-components-dev/lib/Div';
import { Shimmer, BackgroundMasker } from 'hometown-components-dev/lib/Shimmer';

const LoaderShimmer = () => (
  <Div type="block">
    <Shimmer height="800px">
      <BackgroundMasker width="100%" height="15px" top="30px" />
      <BackgroundMasker width="calc((100% - 1170px) / 2)" height="calc(15px + 40px + 10px)" top="30px" />
      <BackgroundMasker width="calc((100% - 1170px) / 2)" height="calc(15px + 40px + 10px)" top="30px" right="0" />
      <BackgroundMasker width="40px" height="40px" top="calc(30px + 15px)" left="calc(((100% - 1170px) / 2) + 140px)" />
      <BackgroundMasker
        width="10px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px)"
      />
      <BackgroundMasker
        width="10px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px)"
      />
      <BackgroundMasker
        width="10px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 120px)"
      />
      <BackgroundMasker
        width="10px"
        height="40px"
        top="calc(30px + 15px)"
        left="calc(((100% - 1170px) / 2) + 140px + 450px + 90px + 210px)"
      />
      <BackgroundMasker
        width="5px"
        height="40px"
        top="calc(30px + 15px)"
        right="calc(((100% - 1170px) / 2) + 24px + 10px + 30px)"
      />
      <BackgroundMasker width="5px" height="40px" top="calc(30px + 15px)" right="calc(((100% - 1170px) / 2) + 30px)" />
      <BackgroundMasker width="5px" height="40px" top="calc(30px + 15px)" right="calc(((100% - 1170px) / 2) + 95px)" />
      <BackgroundMasker width="100%" height="10px" top="calc(30px + 15px + 40px)" />
      <BackgroundMasker width="100%" height="2px" top="calc(30px + 15px + 40px + 50px)" />
      <BackgroundMasker width="100%" height="50px" top="calc(30px + 15px + 40px + 50px + 500px)" />
      <BackgroundMasker width="30%" height="50px" top="calc(30px + 15px + 40px + 50px + 550px)" right="0" />
      <BackgroundMasker width="30%" height="50px" top="calc(30px + 15px + 40px + 50px + 550px)" left="0" />
      <BackgroundMasker width="100%" height="50px" top="calc(30px + 15px + 40px + 50px + 500px + 90px)" />
    </Shimmer>
  </Div>
);

export default LoaderShimmer;
