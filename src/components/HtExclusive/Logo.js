import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

export default function Logo() {
  return (
    <Box>
      <Row justifyContent="center" py="20">
        <Image
          src="https://static.hometown.in/media/cms/hometownnew/ht-exclusive/Logo/exclusive-logo.png"
          alt="ht-exclusive-logo"
          height="70px"
          width="270px"
        />
      </Row>
    </Box>
  );
}
