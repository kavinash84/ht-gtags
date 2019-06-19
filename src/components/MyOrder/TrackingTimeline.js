import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    // const { data } = this.props;
    return (
      <div className={stylesModal.trackingWrapper}>
        <Row type="block" m="0" mb="0.5rem">
          <Div col="1">
            <Img width="100%" src="https://www.hometown.in/media/product/03/8153/50423/1-product_500.jpg" alt="" />
          </Div>
          <Div col="2" pl="10px" pr="10px">
            <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
              product name
            </Text>
          </Div>
          <Div col="8">
            <Row ml="0" mr="0" flexWrap="nowrap" className={stylesModal.timeline}>
              <Div display="flexEqual" className={stylesModal.active}>
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual" className={stylesModal.active}>
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual" className={stylesModal.active}>
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual">
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual">
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual">
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual">
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
              <Div display="flexEqual">
                <Text className={stylesModal.stepText} fontSize="12px">
                  Step 1
                </Text>
                <Div className={stylesModal.round} />
                <Div className={stylesModal.line} />
              </Div>
            </Row>
            {/* {status.map(statusDetails => {
              const { status: StatusKey } = statusDetails;
              return <p> {StatusKey || 'NA'} </p>;
            })} */}
          </Div>
        </Row>
        {/* {data.map(item => {
          const { image, product_name: name, status } = item;
          return (
            <Row type="block" m="0" mb="0.5rem">
              <Div col="1">
                <Img
                  width="100%"
                  src={image || 'https://www.hometown.in/media/product/03/8153/50423/1-product_500.jpg'}
                  alt=""
                />
              </Div>
              <Div col="2" pl="10px" pr="10px">
                <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                  {name}
                </Text>
              </Div>
              <Div col="8">
                <section className={stylesModal.cdHorizontalTimeline}>
                  <div className={stylesModal.timeline}>
                    <div className={stylesModal.eventsWrapper}>
                      <div className={stylesModal.events}>
                        <ol>
                          <li><a href="#0" data-date="00/00/00" className={stylesModal.selected}>00:00</a></li>
                          <li><a href="#0" data-date="01/00/00">01:00</a></li>
                          <li><a href="#0" data-date="02/00/00">02:00</a></li>
                          <li><a href="#0" data-date="03/00/00">03:00</a></li>
                          <li><a href="#0" data-date="04/00/00">04:00</a></li>
                          <li><a href="#0" data-date="05/00/00">05:00</a></li>
                          <li><a href="#0" data-date="06/00/00">06:00</a></li>
                          <li><a href="#0" data-date="07/00/00">07:00</a></li>
                          <li><a href="#0" data-date="08/00/00">08:00</a></li>
                        </ol>
                        <span className={stylesModal.fillingLine} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </section>
                {status.map(statusDetails => {
                  const { status: StatusKey } = statusDetails;
                  return <p> {StatusKey || 'NA'} </p>;
                })}
              </Div>
            </Row>
          );
        })} */}
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  // data: PropTypes.array.isRequired
};
export default TrackingDetails;
