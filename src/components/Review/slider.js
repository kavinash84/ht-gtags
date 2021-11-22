import React, { Component } from "react";
import Div from "hometown-components/lib/Div";

const styles = require("./slider.scss");
export default class CustomSlider extends Component {
  render() {
    const { ratings, handleChange } = this.props;
    return (
      <Div className={styles.customSlider}>
        <input
          type="range"
          min={1}
          max={5}
          value={ratings}
          className={styles.slider1}
        />
        <input
          type="range"
          min={1}
          max={5}
          onChange={e => handleChange(e.target.value)}
          value={ratings}
          className={styles.slider2}
          style={{ position: "absolute", top: "5px", left: 0 }}
        />
        <Div className={styles.rangeLabelsContainer}>
          <span className={styles.rangeLabels}>1</span>
          <span className={styles.rangeLabels}>2</span>
          <span className={styles.rangeLabels}>3</span>
          <span className={styles.rangeLabels}>4</span>
          <span className={styles.rangeLabels}>5</span>
        </Div>
      </Div>
    );
  }
}
