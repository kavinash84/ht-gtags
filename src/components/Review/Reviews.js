import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import { Link } from "react-router-dom";
// import ReviewsData from "./ReviewsData";

const Star = require("../../../static/Review/star.svg");

const styles = require("./index.scss");

@connect(({ reviews }) => ({
  ReviewsData: reviews.reviewsList,
  EndOfList: reviews.endOfList,
  loading: reviews.loading
}))
export default class Reviews extends Component {
  getDate = date => {
    const d = new Date(date);
    const arr = d.toString().split(" ");
    return `${arr[2]}th ${arr[1]} ${arr[3]}`;
  };
  render() {
    const { handlePagination, EndOfList, loading, ReviewsData } = this.props;
    return (
      <Section p="0" mb="0" className={styles.reviewsContainer}>
        <Div className={styles.reviewListContainer}>
          {ReviewsData.map(item => (
            <Div className={styles.reviewContainer}>
              <Link to={item.pdp_link ? item.pdp_link : item.link || ""}>
                <Div className={styles.customerName}>{item.nickname}</Div>
                <Div className={styles.subDetails}>
                  <Div style={{ width: "80%" }}>
                    <Div className={styles.ratings}>
                      <Img
                        src={Star}
                        width="24px"
                        height="24px"
                        alt="Star"
                        style={{
                          display:
                            1 <= Math.floor(item.ratings) ? "block" : "none"
                        }}
                      />
                      <Img
                        src={Star}
                        width="24px"
                        height="24px"
                        alt="Star"
                        style={{
                          display:
                            2 <= Math.floor(item.ratings) ? "block" : "none"
                        }}
                      />
                      <Img
                        src={Star}
                        width="24px"
                        height="24px"
                        alt="Star"
                        style={{
                          display:
                            3 <= Math.floor(item.ratings) ? "block" : "none"
                        }}
                      />
                      <Img
                        src={Star}
                        width="24px"
                        height="24px"
                        alt="Star"
                        style={{
                          display:
                            4 <= Math.floor(item.ratings) ? "block" : "none"
                        }}
                      />
                      <Img
                        src={Star}
                        width="24px"
                        height="24px"
                        alt="Star"
                        style={{
                          display:
                            5 <= Math.floor(item.ratings) ? "block" : "none"
                        }}
                      />
                    </Div>
                    <Div className={styles.location}>Mumbai</Div>
                  </Div>
                  <Div className={styles.logoContainer}>
                    <Img src={Star} width="60px" height="60px" alt="Star" />
                  </Div>
                </Div>
                <Div className={styles.productImage}>
                  <Img src={item.product_image} alt="Star" />
                </Div>
                <Div className={styles.reviewDetails}>
                  <Div className={styles.reviewText}>{item.detail}</Div>
                </Div>
                <Div className={styles.date} style={{ fontSize: "20px" }}>
                  {this.getDate(item.created_at)}
                </Div>
              </Link>
            </Div>
          ))}
        </Div>
        {EndOfList ? null : (
          <div
            onClick={() => {
              if (!loading) handlePagination();
            }}
          >
            <Div className={styles.showMore}>SHOW MORE</Div>
          </div>
        )}
      </Section>
    );
  }
}
