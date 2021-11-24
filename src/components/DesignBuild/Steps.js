import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import { connect } from 'react-redux';

const styles = require('./Designbuild.scss');
const Arrow = require('../../../static/categories/Line.svg');

@connect(({ designBuild }) => ({
    designBuild,
    stepsToDreamhome: designBuild.data.items.text.stepsToDreamhome
  }))

class Steps extends React.Component {
    state = {
        isOpen: false
      };
      handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };
      render() {
        const {
     title, description, length, index
    } = this.props;
        return (
          <Box
            style={{
              background: this.state.isOpen ? '#F5F5F5' : '#F5F5F5',
              width: '100'
            }}
          >
            {this.state.isOpen ? (
              <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
                <Box>
                  <Box
                    style={{
                      padding: '20px 0px 22px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginLeft: '5%',
                        alignItems: 'center',
                        color: 'black',
                        cursor: 'pointer',
                        fontSize: '20px',
                      }}
                    >
                      <div>{title}</div>
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
              <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
                <Box
                  style={{
                    padding: '20px 0px 22px',
                    // borderBottom: index + 1 === length ? 'none' : '1px solid #E3E3E3'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '90%',
                      marginLeft: '5%',
                      alignItems: 'center',
                      fontSize: '20px'
                    }}
                  >
                    <div className={styles.title2}>{title}</div>
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