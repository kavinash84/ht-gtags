import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
@connect(({ modularkitchen }) => ({
  modularkitchen,
  beginJourney: modularkitchen.data.items.text.beginJourney
}))
class DreamKitchen extends React.Component {
  render() {
    const { beginJourney } = this.props;
    return (
      <Div marginTop="50px" style={{ cursor: "pointer" }}>
        <Img
          onClick={this.props.handleModal}
          data-src={beginJourney.image}
          alt={beginJourney.title}
        />
      </Div>
    );
  }
}

export default DreamKitchen;
