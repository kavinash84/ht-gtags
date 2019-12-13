import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components-dev/lib/Buttons';
import Span from 'hometown-components-dev/lib/Span';
import { Label } from 'hometown-components-dev/lib/Label';

const styles = require('./Dropdown.scss');

const Dropdown = ({
 title, display, data, onclick
}) => (
  <div className={`${styles.filterBlock} dropdownWrapper`}>
    <Button btnType="custom" bg="#FFF" color="#656565" border="none" fontSize="0.75em" tt="uppercase">
      {title || 'Popularity'}
      <Span ml="0.5rem" fontSize="1.5em">
        &#9662;
      </Span>
    </Button>
    <div className={`dropDown ${display === 'rtl' ? 'blockRight' : ''}`}>
      {/* eslint-disable */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <div onClick={onclick(item.url_key, 'SortBy', item.value)}>
              <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                {item.value}
              </Label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Dropdown.defaultProps = {
  data: [],
  title: '',
  display: 'ltr',
  checkbox: false
};

Dropdown.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  display: PropTypes.string,
  checkbox: PropTypes.bool,
  onclick: PropTypes.func
};

export default Dropdown;
