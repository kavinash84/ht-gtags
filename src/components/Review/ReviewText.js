import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";

const styles = require("./index.scss");

export default class ReviewText extends Component {
  state = {
    showMore: false
  };
  getCharCount = chars => {
    const { showMore } = this.state;
    if (chars && String.toString(chars)) {
      if (chars.length >= 70 && !showMore) {
        let result = chars.slice(0, 70);
        return (
          <div>
            <Div
              className={styles.reviewText}
              title={result}
              style={{ height: "74px" }}
            >
              {result}
            </Div>
            {!showMore && (
              <div
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => this.setState({ showMore: true })}
              >
                <span>show more</span>
              </div>
            )}
          </div>
        );
      }
      return (
        <div>
          <Div
            className={styles.reviewText}
            title={chars}
            style={{
              overflow: showMore ? "auto" : "hidden",
              display: showMore ? "block" : "-webkit-box"
            }}
          >
            {chars}
          </Div>
        </div>
      );
    }
    return (
      <div>
        <Div className={styles.reviewText} title={chars}>
          {chars}
        </Div>
      </div>
    );
  };
  handleShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };
  render() {
    const { text } = this.props;
    return <React.Fragment>{this.getCharCount(text)}</React.Fragment>;
  }
}
