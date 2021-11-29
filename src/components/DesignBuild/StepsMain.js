import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';
import Steps from './Steps';

// const styles = require('./Designbuild.scss');
const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

@connect(({ designbuild }) => ({
  designbuild,
  stepsToDreamhome: designbuild.data.items.text.stepsToDreamhome
}))
export default class StepsMain extends Component {
  state = {
    initialItems: [],
    length: 0
  };
  componentDidMount() {
    const { stepsToDreamhome } = this.props;
    this.setState({ initialItems: stepsToDreamhome.values });
    this.setState({ length: 7 });
  }
  render() {
    const { stepsToDreamhome } = this.props;
    const { initialItems, length } = this.state;
    return (
      <Box
        style={{
          backgroundColor: '#F5F5F5',
          paddingTop: '30px',
          marginTop: '30px',
          paddingBottom: '0px',
        }}
      >
        <Box
          style={{
            fontSize: '40px',
            lineHeight: '50px',
            fontWeight: 600,
            marginBottom: '10px',
            color: 'black',
            textAlign: 'left',
            marginLeft:'10%'
          }}
        >
        5 Steps to Your <br /> Dream Home
        </Box>
        <Box style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          {initialItems.map((item, i) => {
            if (i + 1 <= length) {
              return (
                <div>
                  <Steps
                    title={item.title}
                    description={item.description}
                    lenght={stepsToDreamhome.values.length}
                    index={i}
                  />
                </div>
              );
            }
          })}
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 10px 0px',
            }}
          >
            {/* <div
              style={{
                color: 'black',
                display: length < initialItems.length ? '' : 'none',
                padding: '10px 10px 50px',
                fontWeight: 600,
                fontSize: '14px'
              }}
              onClick={() => {
                this.setState({ length: length + 7 });
              }}
            >
              SHOW MORE
              <img
                style={{
                  display: 'inline',
                  marginLeft: '-8px',
                  height: '10px',
                  width: '40px'
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </div> */}

            <Button
            onClick={this.props.handleModal}
            style={{
              width: '200px',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              borderRadius: '5px'
            }}
          >
            Book Consultation
          </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
