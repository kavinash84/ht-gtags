import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';

@connect(({ homepage: { banners } }) => ({
  banners: banners.data
}))
export default class ModularKitchen extends Component {
  state = {
    showRibbon: true
  };
  handleRibbon = () => {
    this.setState({
      showRibbon: !this.state.showRibbon
    });
  };
  render() {
    const { banners } = this.props;
    return (
      <Section p="0" mb="0">
        <MainSlider data={banners} />
      </Section>
    );
  }
}

ModularKitchen.defaultProps = {
  banners: []
};

ModularKitchen.propTypes = {
  banners: PropTypes.array
};
