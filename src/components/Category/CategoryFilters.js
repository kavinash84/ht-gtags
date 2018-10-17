import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./CategoryFilters.scss');
const showLessIcon = require('../../../static/chevron_right.svg');

class CategoryFilterItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };
  state = {
    show: this.props.index === 0
  };

  handleClick = () => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const { sub } = this.props;
    const { show } = this.state;
    return (
      <li key={sub.id}>
        <Link to={`/${sub.url_key}`}>
          <Label color="filterTitle" mt="0.3125rem" mb="0.3125rem" display="block" fontFamily="regular" lh="1.5">
            {sub.name}
          </Label>
        </Link>
        {sub &&
          sub.children && (
          <Button p="4px 0" lh="0.5" fontSize="1.25rem" btnType="link" onClick={this.handleClick}>
            <Img src={showLessIcon} alt={show ? 'more' : 'less'} className={show ? styles.open : styles.close} />
          </Button>
        )}
        <ul className={`${styles.categoryLevel3} ${show ? '' : styles.hide}`}>
          {sub &&
            sub.children &&
            sub.children.map(sub3 => (
              <li key={sub3.id}>
                <Label key={sub3.id} color="textLight" mt="0.625rem" mb="0.625rem" display="block" fontSize="0.875rem">
                  <Link to={`/${sub3.url_key}`}>{sub3.name}</Link>
                </Label>
              </li>
            ))}
        </ul>
      </li>
    );
  }
}

const CategoryFilters = ({ data }) => (
  <Row display="block" ml="0" mr="0">
    <Div>
      <ul className={styles.categoryUl}>
        {data &&
          data
            .filter(menu => menu.visibility === 'on')
            .map((sub, index) => <CategoryFilterItem index={index} sub={sub} key={String(index)} />)}
      </ul>
    </Div>
  </Row>
);

CategoryFilters.defaultProps = {
  data: []
};

CategoryFilters.propTypes = {
  data: PropTypes.array
};

CategoryFilterItem.defaultProps = {
  sub: {}
};

CategoryFilterItem.propTypes = {
  sub: PropTypes.object
};

export default CategoryFilters;
