import React, { Component } from "react";

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
        <div id="listing-ht">
          <div className="empty_div" />
          <div id="hometown_1573910556">
            <div class="unbxd-container">
              <div class="unbxd-left-col">
                <div class="unbxd-filter-container">
                  <div class="unbxd-filter-header">
                    <span>FILTER BY</span>
                    <button class="unbxd-clearall-filter">CLEAR FILTERS</button>
                  </div>
                  <div class="unbxd-filter-body"></div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
