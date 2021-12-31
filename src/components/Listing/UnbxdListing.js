import React, { Component } from "react";
import Helmet from "react-helmet";

export default class SearchResults extends Component {
  // componentDidMount() {
  //   // alert('in componentDidMount')
  //   // window.unbxd_fun()
  // }
  // componentWillMount() {
  //   //alert('in componentWillMount')
  // }
  // componentWillUnmount() {
  //   // alert('in componentWillUnMount')
  // }

  // componentWillUpdate() {
  //  // alert('in componentWillUpdate')
  //   // window.unbxd_fun()
  // }

  // componentDidUpdate() {
  //   // alert('in componentDidUpdate');
  //   // window.unbxd_fun();
  // }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js"></script>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.css"
          />
        </Helmet>
        <div id="listing-ht">
          <div className="empty_div" />
          <div id="hometown_1573910556">
            <div class="unbxd-wrapper">
              <div class="unbxd-loader"></div>
              <div class="unbxd-container">
                <div class="unbxd-left-col">
                  <div class="unbxd-filter-container"></div>
                </div>
                <div class="unbxd-right-col">
                  <div class="unbxd-top-container">
                    <div class="unbxd-view"></div>
                    <div class="unbxd-sortby"></div>
                    <div class="unbxd-location"></div>
                  </div>
                  <div class="unbxd-bottom-container">
                    <div class="unbxd-products-container"></div>
                  </div>
                  <div class="unbxd-pagination-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
