import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
import SortAndFilter from "./sortAndFilter";
import { loadReviewsList, togglePageNumber } from "../../redux/modules/reviews";


const styles2 = require("./index.scss");

@connect(({ reviews }) => ({
  ReviewsData: reviews.reviewsList,
  cmsData: reviews.cmsData.items.text
}))
export default class ReviewComponentsContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pageNo: 0,
    pageSize: 8,
    filterValue: "",
    sortValue: "",
    filterValue2: "",
    sortValue2: ""
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    const { pageNo, pageSize } = this.state;
    const { ReviewsData } = this.props;
    // const data = `pageNo=${pageNo}&pageSize=${pageSize}`;
    // dispatch(loadReviewsList(data));
    // if (Array.isArray(ReviewsData.length)) {
    if (ReviewsData.length === 0) {
      const data = `pageNo=${pageNo}&pageSize=${pageSize}`;
      dispatch(loadReviewsList(data));
    }
    // }
  }
  handlePagination = () => {
    const { pageNo, pageSize } = this.state;
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(null));
    this.setState({ pageNo: pageNo + 1 });
  };
  applySort = value => {
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(1));
    const { pageNo, pageSize, filterValue2, sortValue } = this.state;
    let data = ``;
    if (value) {
      data = filterValue2
        ? `pageNo=${0}&pageSize=${8}&rating=${filterValue2}&sort=${value}`
        : `pageNo=${0}&pageSize=${8}&sort=${value}`;
    } else {
      data = filterValue2
        ? `pageNo=${0}&pageSize=${8}&rating=${filterValue2}`
        : `pageNo=${0}&pageSize=${8}`;
    }
    dispatch(loadReviewsList(data));
    this.setState({
      sortValue2: value,
      pageNo: 0,
      pageSize: 8
    });
  };
  applyFilter = value => {
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(1));
    const { pageNo, pageSize, filterValue, sortValue2 } = this.state;
    let data = ``;
    if (value) {
      data = sortValue2
        ? `pageNo=${0}&pageSize=${8}&sort=${sortValue2}&rating=${value}`
        : `pageNo=${0}&pageSize=${8}&rating=${value}`;
    } else {
      data = sortValue2
        ? `pageNo=${0}&pageSize=${8}&sort=${sortValue2}`
        : `pageNo=${0}&pageSize=${8}`;
    }
    dispatch(loadReviewsList(data));
    this.setState({
      filterValue2: value,
      pageNo: 0,
      pageSize: 8
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageNo !== prevState.pageNo) {
      const { dispatch } = this.context.store;
      const { pageNo, pageSize, filterValue2, sortValue2 } = this.state;
      let data = ``;
      if (sortValue2 && filterValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&rating=${filterValue2}&sort=${sortValue2}`;
      } else if (sortValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&sort=${sortValue2}`;
      } else if (filterValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&rating=${filterValue2}`;
      } else {
        data = `pageNo=${pageNo}&pageSize=${pageSize}`;
      }
      dispatch(loadReviewsList(data));
    }
  }
  render() {
    const { filterValue2, sortValue2 } = this.state;
    return (
      <Section p="0" mb="0">
        <Div
          style={{
            width: "100%",
            height: "auto",
            padding: "0% 7%",
            marginBottom: "30px"
          }}
        >
          <Link to="/writereview">
            <Img
              src={this.props.cmsData.desktop.top}
              alt="Banner"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </Div>
        <Div
          style={{
            padding: "0% 7%",
            background: "#F5F7FA",
            marginBottom: "30px",
            height: "auto"
          }}
        >
          <Div className={styles2.titleContainer}>
            <Div className={styles2.title}>Customers Speak</Div>
            <Div className={styles2.titleBottom} />
          </Div>
          <SortAndFilter
            filterValue={filterValue2}
            sortValue={sortValue2}
            applySort={this.applySort}
            applyFilter={this.applyFilter}
          />
          <Reviews handlePagination={this.handlePagination} />
        </Div>
        <Div style={{ width: "100%", height: "auto", padding: "0% 7%" }}>
          <Img
            src={this.props.cmsData.desktop.bottom}
            alt="Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </Div>
      </Section>
    );
  }
}
