import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';

const styles = require('./Designbuild.scss');
const Arrow = require('../../../static/categories/Line.svg');

export default class QDropDown extends Component {
  state = {
    isOpen: false
  };
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { title, description, length, index } = this.props;
    return (
      <Box
        style={{
          background: this.state.isOpen ? 'white' : 'white',
          width: '80%',
          marginLeft: '10%'
        }}
      >
        {this.state.isOpen ? (
          <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
            <Box style={{ borderBottom: index + 1 === length ? 'none' : '1px solid #E3E3E3' }}>
              <Box
                style={{
                  padding: '20px 0px 22px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    color: '#999999',
                    cursor: 'pointer'
                  }}
                >
                  <div>{title}</div>
                  <Box
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <img src={Arrow} alt="aarow" className={styles.iconrotate} />
                  </Box>
                </div>
              </Box>
              <div className={styles.description}>{description}</div>
            </Box>
          </div>
        ) : (
          <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
            <Box
              style={{
                padding: '20px 0px 22px',
                borderBottom: index + 1 === length ? 'none' : '1px solid #E3E3E3'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <div className={styles.title}>{title}</div>
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
