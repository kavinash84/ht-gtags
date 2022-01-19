import React, { Component } from 'react';

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
            <section className="filterwrapper">
              <div className="filter">
                <div className="parent_flex">
                  <div className="child_flex">
                    <div className="left-col">
                      <p className="filterby">Filter By</p>
                      <div className="unbxd-facet-container">
                        <div className="dropparent">
                          <p>
                            Color (Any)
                            <img src="https://hometown.in/images/unbxd/triangles-copy-2.png" alt="Caret" />
                          </p>
                          <ul className="dropdown" />
                        </div>
                        <div className="dropparent">
                          <p>
                            Size (Any)
                            <img src="https://hometown.in/images/unbxd/triangles-copy-2.png" alt="Caret" />
                          </p>
                          <ul className="dropdown" />
                        </div>
                        <div className="dropparent">
                          <p>
                            Material (Any)
                            <img src="https://hometown.in/images/unbxd/triangles-copy-2.png" alt="Caret" />
                          </p>
                          <ul className="dropdown" />
                        </div>
                      </div>
                      <div className="tags">
                        <ul />
                      </div>
                      <div className="location">
                        <div>
                          <span className="marker">
                            <img src="https://hometown.in/images/unbxd/shape.png" alt="Marker" />
                          </span>
                          <span className="desc">For delivery details</span>
                          <input id="search" type="number" placeholder="Enter your pincode" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="child_flex">
                    <div className="right-col">
                      <ul>
                        <li>
                          <div>
                            <p className="clearfilters">
                              <button>Clear filters</button>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p className="sortby">Sort By</p>
                            <div className="dropparent">
                              <select title="Sort By">
                                <option>Best sellers</option>
                              </select>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div id="didyoumean" />
              <div className="ploader" />
              <div className="search-title" />
              <div className="category-title" />
            </section>
            <section className="listwrapper">
              <div className="listing">
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                        height="270px"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div className="topname">
                      <div className="child_flex" />
                      <div className="child_flex">
                        <ul />
                      </div>
                    </div>
                    <ul className="color" />
                    <div className="buynow">
                      <div className="child_flex" />
                      <div className="child_flex" />
                    </div>
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                        height="270px"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div className="topname">
                      <div className="child_flex" />
                      <div className="child_flex">
                        <ul />
                      </div>
                    </div>
                    <ul className="color" />
                    <div className="buynow">
                      <div className="child_flex" />
                      <div className="child_flex" />
                    </div>
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                        height="270px"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div className="topname">
                      <div className="child_flex" />
                      <div className="child_flex">
                        <ul />
                      </div>
                    </div>
                    <ul className="color" />
                    <div className="buynow">
                      <div className="child_flex" />
                      <div className="child_flex" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pagination" />
              <div id="unbxd_recommended_for_you" />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
