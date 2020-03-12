import React from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import ThankYou from '../ThankYou';

/**
 * Icons
 */
const gratificationRectangleIcon = require('../../../static/gratificationRectangle.svg');

const Gratification = ({ title, subTitle }) => (
  <Box>
    <ThankYou title={title} subTitle={subTitle} />
    <Box pl={0} pr={0} mb={-3} sx={{ position: 'relative' }}>
      <Image src={gratificationRectangleIcon} width={1} />
      <Col
        alignItems="center"
        width={1}
        sx={{
          position: 'absolute',
          top: '42px'
        }}
      >
        <Label width={1} textAlign="center" color="textPrimary" fontSize={16} mb={10}>
          Set password & save your details for future
        </Label>
        <Box width={350}>
          <FormInput label="" type="text" placeholder="Type Password *" width={1} height={48} bg="transparent" />
          <FormInput
            label=""
            type="text"
            placeholder="Confirm Password *"
            width={1}
            height={48}
            bg="transparent"
            mb={10}
          />
          <Button mt={15} color="white" fontSize={16} height={50} width={1} bg="primary">
            SET PASSWORD
          </Button>
        </Box>
      </Col>
    </Box>
  </Box>
);

Gratification.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

Gratification.defaultProps = {
  title: 'Thank You!',
  subTitle: ''
};

export default Gratification;
