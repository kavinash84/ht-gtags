import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/** Components */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import InputField from 'hometown-components-dev/lib/InputFieldHtV1';
import Label from "hometown-components-dev/lib/LabelHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";

class WriteReviewMobile extends Component {
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

    return (
      <Box width={1} mt={10}>
        <Button onClick={this.toggleAddReview} width={1} fontFamily="medium">Write a Review</Button>
        {(addreview) &&
          <form onSubmit={this.handleSubmit}>
            <Box pt={20} width={[1, 1, 5 / 12]}>
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
                <InputField
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
                <InputField
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

WriteReviewMobile.defaultProps = {
};

WriteReviewMobile.propTypes = {
  onClickSubmit: PropTypes.func.isRequired,
  catalogId: PropTypes.string.isRequired,
  added: PropTypes.bool.isRequired,
};

export default WriteReviewMobile;
