import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/** Components */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import ReviewDisplay from './ReviewDisplay';
import FormInput from "hometown-components-dev/lib/FormsHtV1/FormInputHtV1";

class WriteReview extends Component {
  state = {
    name: '',
    rating: 0,
    review: '',
    nameError: false,
    nameErrorMessage: 'Name cannot be left Blank',
    reviewError: false,
    reviewErrorMessage: 'Review cannot be left Blank',
    addreview: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.added && nextProps.added !== this.props.added) {
      this.setState({ addreview: false, name: '', review: '' });
    }
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Error`]: false
    });
  }
  ratingChanged = newRating => {
    this.setState({
      rating: Number(newRating)
    });
  }

  toggleAddReview = e => {
    e.preventDefault();
    this.setState({
      rating: 0,
      addreview: !this.state.addreview
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { onClickSubmit, catalogId } = this.props;
    const {
      name, review, rating,
    } = this.state;
    const nameError = !(name.length > 0);
    const reviewError = !(review.length > 0);
    if (nameError || reviewError) {
      return this.setState({
        nameError,
        reviewError
      });
    }
    onClickSubmit(catalogId, { name, rating, review });
  }
  render() {
    const {
      addreview, nameError, nameErrorMessage, reviewError, reviewErrorMessage, name, review
    } = this.state;
    const {
      count,
      reviews,
      ratings,
      children
    } = this.props;

    return (
      <Box width={1}>
        <ReviewDisplay ratings={ratings} reviews={reviews} count={count}>
          {children}
          <Button display={['none', 'block']} onClick={this.toggleAddReview}>Write a Review</Button>
        </ReviewDisplay>
        {(addreview) &&
          <form onSubmit={this.handleSubmit}>
            <Box width={[1, 1, 5 / 12]}>
              <Row alignItems="center" mx={0} mb={15}>
                <Label mr={10}>Rating</Label>
                <ReactStars
                  count={5}
                  onChange={this.ratingChanged}
                  size={20}
                  value={this.state.rating}
                  half={false}
                  color2="#ffd700"
                />
              </Row>
              <Box>
                <FormInput
                  label="Name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  feedBackError={nameError}
                  feedBackMessage={nameErrorMessage}
                  onChange={this.handleChange}
                />
              </Box>
              <Box marginBottom="0.3125rem">
                <FormInput
                  type="textarea"
                  label="Review"
                  name="review"
                  placeholder="Review"
                  value={review}
                  feedBackError={reviewError}
                  feedBackMessage={reviewErrorMessage}
                  onChange={this.handleChange}
                  rows="3"
                  height={80}
                />
              </Box>
              <Box>
                <Button
                  type="submit"
                  btnType="primary"
                  size="large"
                  fontFamily="regular"
                  fontSize="0.875em"
                  height="42px"
                  lh="2"
                >SUBMIT</Button>
              </Box>
            </Box>
          </form>
        }
      </Box>
    );
  }
}

WriteReview.defaultProps = {
  count: 5,
  reviews: 0,
  ratings: 0,
  children: null
};

WriteReview.propTypes = {
  onClickSubmit: PropTypes.func.isRequired,
  catalogId: PropTypes.string.isRequired,
  added: PropTypes.bool.isRequired,
  ratings: PropTypes.number,
  reviews: PropTypes.number,
  count: PropTypes.number,
  children: PropTypes.node,
};

export default WriteReview;
