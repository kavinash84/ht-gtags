import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from '../Carousel';

const mapStateToProps = ({ shopByStles }) => ({
  ...shopByStles
});

class ShopByStyle extends Component {
  render() {
    const { data } = this.props;
    return (
      <section>
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>Shop by Style</h4>
            </div>
          </div>
        </div>
        <Carousel
          autoPlayVal={false}
          className="catSlider"
          showThumbsVal={false}
          showStatusVal={false}
          showArrowsVal={false}
          showIndicatorsVal={false}
          infiniteLoopVal={false}
          centerModeVal
          centerSlidePercentageVal={42}
          sliderImages={data}
          contentStatus
          typeOfSlider="catSlider"
        />
      </section>
    );
  }
}

ShopByStyle.defaultProps = {
  data: []
};

ShopByStyle.propTypes = {
  data: PropTypes.array
};

export default connect(mapStateToProps, null)(ShopByStyle);
