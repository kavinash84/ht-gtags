import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import FeedbackContainer from 'components/ContactUs/Feedback';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Menu />
        <FeedbackContainer />
        <Footer />
      </div>
    );
  }
}
