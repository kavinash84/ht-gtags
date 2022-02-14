import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const ReviewsItems = ({ review, labelProps, ...props }) =>
  // const color = judgeColor(review.options[0].option_value);
  (
    <Col width="100%" py={8}>
      <Box p={12} >
        <Row mb={10} mx={0}>
          <ReactStars
            count={5}
            className="ratings"
            size={15}
            value={Number(review.options[0].option_value) || null}
            half
            edit={false}
            color2="#222222"
          />
          <Label ml={10} color="#222222" fontFamilly="medium" fontSize={14} {...labelProps}>
            {`${props.ratings}/${props.reviews}`}
          </Label>
          {/* {children[0]} */}
        </Row>
        <Heading variant="heading.small" fontWeight="normal" fontSize={[14, 16, 16]} color="black" pb={5}>
          {review.nickname || review.customer_name || null}
        </Heading>
        <Text
          color="black"
          variant="small"
          lineHeight={1.5}
          fontSize={[12, 14, 14]}
        >{review.detail || null}</Text>
      </Box>
    </Col>
  );

ReviewsItems.defaultProps = {
};

ReviewsItems.propTypes = {
  review: PropTypes.array.isRequired
};

export default ReviewsItems;
