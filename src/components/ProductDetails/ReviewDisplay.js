import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/** Components */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Label from "hometown-components-dev/lib/LabelHtV1";

const ReviewDisplay = ({ children, labelProps, ...props }) => (
  <Flex
    paddingTop="20px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={20}
    pb={10}
    fontSize="17px"
    fontWeight="bold"
    color="rgba(0,0,0,0.6)"
    sx={{ borderTop: ['none', 'dividerLight', 'dividerLight'] }}
    {...props}
  > Overall Rating
    {(props.count && props.ratings)
      ? (
        <Flex alignItems="center">
          <ReactStars
            count={props.count}
            size={16}
            value={props.ratings}
            half={false}
            color2="#222222"
          />
          <Label ml={10} color="#222222" fontFamilly="medium" fontSize={14} {...labelProps}>
            {`${props.ratings}/${5}`}
          </Label>
          {children[0]}
        </Flex>
      )
      : (
        <Flex alignItems="center">
          <Label ml={10} color="#666666" fontSize={14} {...labelProps}>
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
