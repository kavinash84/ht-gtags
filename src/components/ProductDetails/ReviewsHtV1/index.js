import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */

import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
// import Image from 'newComponents/ImageHtV1';
import ReviewItem from './ReviewItem';
// import ExtendMoreIcon from 'newComponents/Icons/ExpandMoreHtV1';
// import extendMoreIcon from '../../static/expand-more.svg';

const Reviews = ({
  reviewItems, showReviews, showMoreReviews, colorIcon
}) => {
  reviewItems = reviewItems.sort((a, b) =>
    (b.options[0] && Number(b.options[0].option_value)) - (a.options[0] && Number(a.options[0].option_value)));
  return (
    <Fragment>
      <Row my={-8}>
        {reviewItems && reviewItems.map((review, index) => {
          if (index < showReviews) {
            return (
              <ReviewItem review={review} key={String(index)} />
            );
          }
          return '';
        })}
      </Row>
      {showReviews <= reviewItems.length && (
        <Row mx={0} py={10} justifyContent="center" sx={{ borderBottom: 'dividerLight' }}>
          <Button
            onClick={showMoreReviews}
            color={colorIcon}
            variant="link"
            display="flex"
            sx={{ alignItems: 'center' }}
          >
            Read more
            {/* <ExtendMoreIcon color={colorIcon} /> */}
            {/* <Image src={extendMoreIcon} alt="More reviews" /> */}
          </Button>
        </Row>
      )}
    </Fragment>
  );
};

Reviews.defaultProps = {
  reviewItems: [],
  colorIcon: '#000',
};

Reviews.propTypes = {
  colorIcon: PropTypes.string,
  reviewItems: PropTypes.array,
  showReviews: PropTypes.number.isRequired,
  showMoreReviews: PropTypes.func.isRequired
};

export default Reviews;
