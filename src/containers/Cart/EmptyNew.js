/* eslint-disable quotes */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';

const Empty = ({
 title, subTitle, btnName, url, children, subTitleWidth, ...props
}) => (
  <Container {...props}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center" display="flex">
      <Box textAlign="center">
        {children}
        <Heading
          color="text"
          ellipsis={false}
          fontFamily="medium"
          textAlign="center"
          mb={20}
          mt={40}
          lh={1.5}
          fontSize={24}
        >
          {title}
        </Heading>
        <Text subTitleWidth={subTitleWidth} textAlign="center" fontFamily="light" fontSize={16} color="#999999">
          {subTitle}
        </Text>
      </Box>
      <Box
        width={1}
        mt={30}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          as={Link}
          to={url}
          py={15}
          height="auto"
          fontFamily="medium"
          sx={{
            height: '47px',
            width: '320px',
            textAlign: 'center'
          }}
          style={{borderRadius:'8px'}}
        >
          {btnName}
        </Button>
      </Box>
    </Flex>
   
  </Container>
);

Empty.defaultProps = {
  subTitleWidth: '100%'
};

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  subTitleWidth: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default Empty;
