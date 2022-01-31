import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import HeadingH5 from 'components/HeadingH5';
import Row from "hometown-components-dev/lib/RowHtV1";
// import span from 'components/span';
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import ReactStars from "react-stars";
import styled from "styled-components";



const TitlePrice = ({
  name,
  brand,
  price,
  discPrice,
  savingsRs,
  savingsPercentage,
  count,
  ratings,
  onClickReviews
}) => (
    <Section mb="0.3125rem" p="0" mt="20px">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading
            itemProp="name"
            fontSize="30px"
            color="#222222"
            mb="0"
            mt="5px"
            lh="1.7"
            fontFamily="medium"
            ellipsis={false}
            pb="5px"
          >
            {name}
          </Heading>

          <div
            style={{
              fontSize: "20px",
              color: "#323131",
              fontFamily: "medium"
            }}
            itemProp="brand"
          >
            {brand}
          </div>
          <Row display="block" mr="0" ml="0">
            <Div col="12">
              <h5
                style={{ fontSize: "1.125em", color: "black" }}
                itemProp="offers"
                itemScope
                itemType="http://schema.org/Offer"
                ellipsis={false}
              >
                <div>
                  {price !== discPrice && (
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(0, 0, 0, 0.4)",
                        marginLeft: "0",
                        fontFamily: "light",
                        lineHeight: "2.2"
                      }}
                      fontSize=""
                      fontFamily="light"
                      type="lt"
                      va="middle"
                    >
                      ₹{price} MRP:
                    </span>
                  )}
                  {price !== discPrice && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(0, 0, 0, 0.4)",
                        fontFamily: "light",
                        marginLeft: "0.75rem"
                      }}
                      va="middle"
                    >
                      ₹{savingsRs}
                      {/* ({savingsPercentage}% OFF) */}
                    </span>
                  )}

                  {price !== discPrice && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(0, 0, 0, 0.4)",
                        marginLeft: "7px",
                        fontFamily: "regular",
                        lineHeight: "1.85"
                      }}
                    >
                      (incl. of all taxes)
                    </span>
                  )}
                </div>
                <span
                  style={{ color: "#f98d29", fontSize: "1.375rem" }}
                  itemProp="price"
                  va="text-top"
                  content={discPrice.split(",").join("")}
                >
                  Offer Price:  ₹{discPrice}
                </span>

              </h5>
              <h5
                style={{
                  fontSize: "1rem",
                  color: "rgba(0, 0, 0, 0.8)",
                  paddingBottom: "2px",
                  fontFamily: "medium"
                }}
                itemScope
                itemType=""
              >

              </h5>
            </Div>
            <Div col="12" ta="right" mt="2px">
              {ratings !== 0 && (
                <Row display="block" mr="-44px" ml="0">
                  <Div col="12" onClick={onClickReviews}>
                    <ReactStars
                      count={5}
                      className="ratings"
                      size={18}
                      value={Number(ratings)}
                      half
                      edit={false}
                      color2="rgb(255, 215, 0)"
                    />
                    <span
                      className="ratingsCount"
                      fontSize="0.875rem"
                      color="#29d"
                      float="left"
                      mt="4px"
                    >
                      ({count} Review{Number(count) === 1 ? "" : "s"})
                  </span>
                    <div
                      className="hide"
                      itemProp="aggregateRating"
                      itemScope
                      itemType="http://schema.org/AggregateRating"
                    >
                      Rated
                    <span itemProp="ratingValue">{ratings}</span>/5 based on
                    <span itemProp="reviewCount">{count}</span>
                    customer reviews
                  </div>
                  </Div>
                </Row>
              )}
            </Div>
          </Row>
        </Row>
      </Container>
    </Section>
  );

TitlePrice.propTypes = {
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
  discPrice: PropTypes.string,
  savingsPercentage: PropTypes.string,
  savingsRs: PropTypes.string,
  ratings: PropTypes.number,
  count: PropTypes.number,
  onClickReviews: PropTypes.func
};

TitlePrice.defaultProps = {
  name: "",
  brand: "",
  price: "",
  discPrice: "",
  savingsPercentage: "",
  savingsRs: "",
  count: 0,
  ratings: 0,
  onClickReviews: () => { }
};

export default TitlePrice;
