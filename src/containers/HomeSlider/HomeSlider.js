import React, { Component } from 'react';
import MainSlider from 'components/HomeSlider';

export default class HomeSlider extends Component {
  render() {
    const styles = require('./HomeSlider.scss');

    return (
      <div className={styles.homeSlider}>
        <MainSlider />
      </div>
    );
  }
}
