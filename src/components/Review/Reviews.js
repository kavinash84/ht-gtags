import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import { Link } from "react-router-dom";
import ReviewText from "./ReviewText";
// import ReviewsData from "./ReviewsData";

const Star = require("../../../static/Review/star.svg");
const amazon = require("../../../static/Review/amazon.svg");
const bajaj = require("../../../static/Review/bajaj.png");
const facebook = require("../../../static/Review/facebook.svg");
const flipcart = require("../../../static/Review/flipcart.svg");
const ht = require("../../../static/Review/ht.png");
const insta = require("../../../static/Review/insta.svg");
const myntra = require("../../../static/Review/myntra.svg");
const pepperfry = require("../../../static/Review/pepperfry.svg");

const styles = require("./index.scss");

@connect(({ reviews }) => ({
  ReviewsData: reviews.reviewsList,
  EndOfList: reviews.endOfList,
  loading: reviews.loading
}))
export default class Reviews extends Component {
  getDate = date => {
    let d = new Date(date) || "";
    const result =
      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    console.log(result);
    return result;
    // const d = new Date(date);
    // const arr = d.toString().split(" ");
    // return `${arr[2]}th ${arr[1]} ${arr[3]}`;
  };
  getLogo = flag => {
    switch (flag) {
      case "amazon":
        return <Img src={amazon} alt="Amazon" width="60px" height="60px" />;
      case "bajaj":
        return <Img src={bajaj} alt="Bajaj" width="60px" height="36px" />;
      case "facebook":
        return <Img src={facebook} alt="Facebook" width="60px" height="60px" />;
      case "flipkart":
        return <Img src={flipcart} alt="Flipkart" width="60px" height="60px" />;
      case "hometown":
        return <Img src={ht} alt="Hometown" width="60px" height="60px" />;
      case "myntra":
        return <Img src={myntra} alt="Mayantra" width="60px" height="60px" />;
      case "pepperfry":
        return (
          <Img src={pepperfry} alt="Pepperfry" width="60px" height="60px" />
        );
      default:
        return <Img src={insta} alt="Instagram" width="60px" height="60px" />;
    }
  };
  render() {
    const { handlePagination, EndOfList, loading, ReviewsData } = this.props;
    return (
      <Section p="0" mb="0" className={styles.reviewsContainer}>
        <Div className={styles.reviewListContainer}>
          {ReviewsData.map(item => (
            <Div className={styles.reviewContainer}>
              {item.link && item.link.startsWith("https") ? (
                <React.Fragment>
                  <a href={item.link || ""} target="_blank">
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
                        <Div className={styles.location}>{item.city}</Div>
                      </Div>
                      <Div className={styles.logoContainer}>
                        {/* <Img src={Star} width="60px" height="60px" alt="Star" /> */}
                        {this.getLogo(item.flag)}
                      </Div>
                    </Div>
                    <Div className={styles.productImage}>
                      <Img src={item.product_image} alt="Product Image" />
                    </Div>
                  </a>
                  <Div className={styles.reviewDetails}>
                    <ReviewText text={item.detail} />
                  </Div>

                  <Div className={styles.date} style={{ fontSize: "20px" }}>
                    {this.getDate(item.created_at)}
                  </Div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {item.link ? (
                    <React.Fragment>
                      <Link to={item.link || ""}>
                        <Div className={styles.customerName}>
                          {item.nickname}
                        </Div>
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
                                    1 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="24px"
                                height="24px"
                                alt="Star"
                                style={{
                                  display:
                                    2 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="24px"
                                height="24px"
                                alt="Star"
                                style={{
                                  display:
                                    3 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="24px"
                                height="24px"
                                alt="Star"
                                style={{
                                  display:
                                    4 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="24px"
                                height="24px"
                                alt="Star"
                                style={{
                                  display:
                                    5 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                            </Div>
                            <Div className={styles.location}>{item.city}</Div>
                          </Div>
                          <Div className={styles.logoContainer}>
                            {/* <Img src={Star} width="60px" height="60px" alt="Star" /> */}
                            {this.getLogo(item.flag)}
                          </Div>
                        </Div>
                        <Div className={styles.productImage}>
                          <Img src={item.product_image} alt="Product Image" />
                        </Div>
                      </Link>
                      <Div className={styles.reviewDetails}>
                        <ReviewText text={item.detail} />
                      </Div>

                      <Div className={styles.date} style={{ fontSize: "20px" }}>
                        {this.getDate(item.created_at)}
                      </Div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
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
                                  1 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="24px"
                              height="24px"
                              alt="Star"
                              style={{
                                display:
                                  2 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="24px"
                              height="24px"
                              alt="Star"
                              style={{
                                display:
                                  3 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="24px"
                              height="24px"
                              alt="Star"
                              style={{
                                display:
                                  4 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="24px"
                              height="24px"
                              alt="Star"
                              style={{
                                display:
                                  5 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                          </Div>
                          <Div className={styles.location}>{item.city}</Div>
                        </Div>
                        <Div className={styles.logoContainer}>
                          {/* <Img src={Star} width="60px" height="60px" alt="Star" /> */}
                          {this.getLogo(item.flag)}
                        </Div>
                      </Div>
                      <Div className={styles.productImage}>
                        <Img src={item.product_image} alt="Product Image" />
                      </Div>
                      <Div className={styles.reviewDetails}>
                        <ReviewText text={item.detail} />
                      </Div>
                      <Div className={styles.date} style={{ fontSize: "20px" }}>
                        {this.getDate(item.created_at)}
                      </Div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Div>
          ))}
          {ReviewsData.length === 0 ? (
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                textAlign: "center",
                width: "100%"
              }}
            >
              No Reviews Found
            </div>
          ) : null}
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
