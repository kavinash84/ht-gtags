import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
// import HeadingH5 from 'components/HeadingH5';
import Row from 'hometown-components-dev/lib/RowHtV1';
// import span from 'components/span';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import ReactStars from 'react-stars';
import styled from 'styled-components';

const ReviewWrapper = styled(Div)`
  right: -11%;
  
  width: 45%;
  position: absolute;
`;

const TitlePrice = ({
  name, price, discPrice, savingsRs, savingsPercentage, count, ratings, onClickReviews
}) => (
    <Section mb="0.3125rem" p="0">
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
          <Row display="block" mr="0" ml="0">
            <Div col="12">
              <h5
                itemProp="offers"
                itemScope
                itemType="http://schema.org/Offer"
                fontSize="1.125em"
                color="primary"
                mb="0px"
                pb="0"
                mt="0px"
                fontFamily="regular"
                ellipsis={false}
              >
                <span
                  va="text-top"
                  itemProp="priceCurrency"
                  content="INR"
                  color="#f98d29"
                  fontSize="1.375rem"
                >₹</span>
                <span
                  itemProp="price"
                  va="text-top"
                  content={discPrice.split(',').join('')}
                  color="#f98d29"
                  fontSize="1.375rem"
                >{discPrice}</span>
                {price !== discPrice &&
                  <span
                    fontSize="0.875rem"
                    color="rgba(0, 0, 0, 0.4)"
                    ml="0.75rem"
                    fontFamily="light"
                    type="lt"
                    va="middle"
                    lh="2.2"
                  >₹{price}</span>
                }
                {price !== discPrice &&
                  <span
                    fontSize="0.75rem"
                    color="rgba(0, 0, 0, 0.4)"
                    ml="7px"
                    fontFamily="regular"
                    va="text-top"
                    lh="1.85"
                  >
                    (incl. of all taxes)
              </span>
                }
              </h5>
              <h5
                itemScope
                itemType=""
                fontSize="1rem"
                color="textDark"
                mb="0px"
                pb="2px"
                mt="0px"
                fontFamily="medium"
              >
                {price !== discPrice &&
                  <span
                    fontSize="0.75rem"
                    color="rgba(0, 0, 0, 0.4)"
                    ml="0"
                    fontFamily="light"
                    va="middle"
                  >Saving ₹{savingsRs}
                    {' '}({savingsPercentage}% OFF)
              </span>
                }
              </h5>
            </Div>
            <Div col="12" ta="right" mt="2px">
              {ratings !== 0 &&
                <Row display="block" mr="-44px" ml="0" >
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
                    >({count} Review{Number(count) === 1 ? '' : 's'})</span>
                    <div className="hide" itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                      Rated
                  <span itemProp="ratingValue">{ratings}</span>/5 based on
                  <span itemProp="reviewCount">{count}</span>
                    customer reviews
                </div>
                  </Div>
                </Row>
              }
            </Div>
          </Row>
        </Row>
      </Container>
    </Section>
  );

TitlePrice.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  discPrice: PropTypes.string,
  savingsPercentage: PropTypes.string,
  savingsRs: PropTypes.string,
  ratings: PropTypes.number,
  count: PropTypes.number,
  onClickReviews: PropTypes.func
};

TitlePrice.defaultProps = {
  name: '',
  price: '',
  discPrice: '',
  savingsPercentage: '',
  savingsRs: '',
  count: 0,
  ratings: 0,
  onClickReviews: () => { }
};

export default TitlePrice;
