import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./Dropdown.scss');

class CategoryFilter extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  setFilter = (key, history) => e => {
    e.preventDefault();
    let query = key.split('/').splice(1);
    query = query.splice(0, query.length - 1).join('/');
    history.push(`/${query}`);
  };

  render() {
    const {
      title, checkbox, display, data, history
    } = this.props;
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
            <li>
              {data.map(item => (
                <div key={item.value} onClick={this.setFilter(item.url_key, history)}>
                  {checkbox && (
                    <div className="checkbox">
                      <input type="checkbox" id="checkbox" checked={item.isSelected} onChange={() => true} />
                      <label htmlFor="checkbox" />
                    </div>
                  )}
                  <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                    {item.value}
                  </Label>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

CategoryFilter.defaultProps = {
  data: [],
  title: '',
  display: 'ltr',
  checkbox: false
};

CategoryFilter.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  display: PropTypes.string,
  checkbox: PropTypes.bool,
  history: PropTypes.object.isRequired
};

export default CategoryFilter;
