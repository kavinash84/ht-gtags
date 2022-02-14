import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/** Components */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Label from "hometown-components-dev/lib/LabelHtV1";

const ReviewDisplay = ({ children, labelProps, ...props }) => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    mb={20}
    pb={10}
    sx={{ borderBottom: ['none', 'dividerLight', 'dividerLight'] }}
    {...props}
  >
    {(props.count && props.ratings)
      ? (
        <Flex alignItems="center">
          <ReactStars
            count={props.count}
            size={16}
            value={props.ratings}
            half={false}
            color2="#f15a22"
          />
          <Label ml={10} color="primary" fontFamilly="medium" fontSize={14} {...labelProps}>
            {`(${props.ratings}) ${props.reviews}`} reviews
          </Label>
          {children[0]}
        </Flex>
      )
      : (
        <Flex alignItems="center">
          <Label ml={10} color="heading" fontSize={14} {...labelProps}>
            No Reviews
          </Label>
        </Flex>
      )}
    {children[1]}
  </Flex>
);

ReviewDisplay.defaultProps = {
  children: {},
  labelProps: {},
  count: 0,
  ratings: 0,
  reviews: 0
};

ReviewDisplay.propTypes = {
  children: PropTypes.node,
  labelProps: PropTypes.object,
  count: PropTypes.number,
  ratings: PropTypes.number,
  reviews: PropTypes.number
};

export default ReviewDisplay;
