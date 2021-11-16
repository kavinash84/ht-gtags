import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';
import QDropDown from './qDropDown';

// const styles = require('./Designbuild.scss');
const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

@connect(({ designBuild }) => ({
  designBuild,
  queries: designBuild.data.items.text.queries
}))
export default class QueryDropDownContainer extends Component {
  state = {
    initialItems: [],
    length: 0
  };
  componentDidMount() {
    const { queries } = this.props;
    this.setState({ initialItems: queries.values });
    this.setState({ length: 7 });
  }
  render() {
    const { queries } = this.props;
    const { initialItems, length } = this.state;
    return (
      <Box
        style={{
          backgroundColor: 'white',
          paddingTop: '30px',
          marginTop: '30px',
          paddingBottom: '0px',
          fontFamily: 'Helvetica Neue'
        }}
      >
        <Box
          style={{
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '10px',
            color: 'black',
            textAlign: 'center'
          }}
        >
          {queries.title}
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '10px'
            }}
          />
        </Box>
        <Box style={{ paddingTop: '10px', paddingBottom: '0px' }}>
          {initialItems.map((item, i) => {
            if (i + 1 <= length) {
 return (
   <div>
     <QDropDown
       title={item.title}
       description={item.description}
       lenght={queries.values.length}
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
              backgroundColor: 'white'
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
          </Box>
        </Box>
      </Box>
    );
  }
}
