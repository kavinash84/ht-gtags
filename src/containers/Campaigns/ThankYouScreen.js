import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

@connect(({ landing }) => ({
  data: landing.successData
}))
class ThankYouPage extends Component {
  state = {
    count: 1
  };
  render() {
    const { uiHtml, data } = this.props;
    return (
      <div>
        Thank You!
        {/* <Description
          itemProp="description"
          fontSize="0.875rem"
          dangerouslySetInnerHTML={{ __html: uiHtml }}
        /> */}
      </div>
    );
  }
}

export default ThankYouPage;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  ul {
    padding-left: 20px;
    li {
      font-size: 14px;
      margin-bottom: 5px;
      font-family: light;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;
