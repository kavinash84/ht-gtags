import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components-dev/lib/Buttons';
import Span from 'hometown-components-dev/lib/Span';
import { Label } from 'hometown-components-dev/lib/Label';

const styles = require('./Dropdown.scss');

export default class Filters extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {
      title, checkbox, display, data, onclick
    } = this.props;

    try {
      let lastselected;
      data.map((item, index) => {
        if (item.isSelected) {
          lastselected = index;
        }
        return 0;
      });
      return (
        <div className={`${styles.filterBlock} dropdownWrapper`}>
          <Button btnType="custom" bg="#FFF" color="#656565" border="none" fontSize="0.75em" tt="uppercase">
            {title}{' '}
            <Span ml="0.5rem" fontSize="1.5em">
              &#9662;
            </Span>
          </Button>
          <div className={`dropDown ${display === 'rtl' ? 'blockRight' : ''}`}>
            {/* eslint-disable */}
            <ul>
              {data &&
                data.map((item, index) => (
                  <li key={index}>
                    <div
                      onClick={
                        lastselected >= 1 && index === lastselected && title === 'Category'
                          ? onclick(data[lastselected - 1].url_key, title, '', data[lastselected - 1].isSelected)
                          : onclick(item.url_key, title, '', item.isSelected)
                      }
                    >
                      {checkbox && (
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox" checked={item.isSelected} onChange={() => true} />
                          <label htmlFor="checkbox" />
                        </div>
                      )}
                      <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                        {item.isHex && (
                          <span
                            key={item.hex_key}
                            className={styles.colorBox}
                            style={{ backgroundColor: item.hex_key }}
                          >
                            {' '}
                          </span>
                        )}
                        {item.value}
                      </Label>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    } catch (e) {
      console.error(`Custom React Error ${e}`);
      return <div />;
    }
  }
}

Filters.defaultProps = {
  data: [],
  title: '',
  display: 'ltr',
  checkbox: false
};

Filters.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  display: PropTypes.string,
  checkbox: PropTypes.bool,
  onclick: PropTypes.func,
  history: PropTypes.object.isRequired
};
