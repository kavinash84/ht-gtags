import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import { connect } from 'react-redux';

const styles = require('./Designbuild.scss');
const Arrow = require('../../../static/categories/Line.svg');
const dot = require('../../../static/newHomepage/dots.png');
const blink = require('../../../static/newHomepage/blink.svg');
const line = require('../../../static/newHomepage/line.svg');


@connect(({ designbuild }) => ({
    designbuild,
    stepsToDreamhome: designbuild.data.items.text.stepsToDreamhome
  }))

class Steps extends React.Component {

      render() {
        const {
     title, description, length, index, isOpen
    } = this.props;
        return (
          <Box
            style={{
              background: isOpen ? '#F5F5F5' : '#F5F5F5',
              width: '100'
            }}
          >
            {isOpen === index ? (
              <div style={{ padding: '0px 30px' }} onClick={()=>{if (isOpen === index){this.props.handleClick('') } else{this.props.handleClick(index)} }}>
                <Box>
               
                  <Box
                    style={{
                      padding: '18px 0px 22px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '80%',
                        marginLeft: '10%',
                        alignItems: 'center',
                        color: 'black',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                    <div style={{display:'flex'}}>
                   <img src={blink} style={{width:'20px', height:'20px', marginLeft:'-26px'}}/>
                      <div style={{textAlign:'left', marginLeft:'10px', marginTop:'2px', cursor: 'pointer'}}>{title}</div>
                      </div>
                      <Box
                        style={{
                          textAlign: 'right'
                        }}
                      >
                        <img src={Arrow} alt="aarow" className={styles.iconrotate}/>
                      </Box>
                    </div>
                  </Box>
                  <div className={styles.descriptionSam}>{description}</div>
                </Box>
              </div>
            ) : (
              <div style={{ padding: '0px 30px' }} onClick={()=>{if (isOpen === index){this.props.handleClick('') } else{this.props.handleClick(index)} }}>
              
                <Box
                  style={{
                    padding: '18px 0px 22px',
                    // borderBottom: index + 1 === length ? 'none' : '1px solid #E3E3E3'
                  }}
                >
                
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '80%',
                      marginLeft: '10%',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                   <div style={{display:'flex'}}>
                   <img src={dot} style={{width:'10px', height:'10px', marginLeft:'-20px'}}/>
                      <div style={{textAlign:'left', marginLeft:'15px', marginTop:'-2px', cursor: 'pointer'}}>{title}</div>
                      </div>
                    <Box
                      style={{
                        textAlign: 'right'
                      }}
                    >
                      <img src={Arrow} alt="aarow" />
                    </Box>
                  
                  </div>
                </Box>
              </div>
            )}
          </Box>
        );
      }
}
 
export default Steps;