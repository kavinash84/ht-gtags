import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';

class CategoryFilterItem extends Component {
  state = {
    show: false
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
        <Label color="textLight" mt="0.625rem" mb="0.625rem" display="block">
          <Link to={`/${sub.url_key}`}>{sub.name}</Link>
          {sub.children && <button onClick={this.handleClick}>{show ? '+' : '-'}</button>}
          <ul>
            {sub.children &&
              sub.children.map(sub3 => (
                <li>
                  <Label key={sub3.id} color="textLight" mt="0.625rem" mb="0.625rem" display="block">
                    <Link to={`/${sub3.url_key}`}>{sub3.name}</Link>
                  </Label>
                </li>
              ))}
          </ul>
        </Label>
      </li>
    );
  }
}

const CategoryFilters = ({ data }) => (
  <Row display="block" ml="0" mr="0">
    <Div>
      <Label color="textDark" mb="1rem" fontFamily="medium" display="block">
        Categories
      </Label>
      <ul>{data && data.filter(menu => menu.visibility === 'on').map(sub => <CategoryFilterItem sub={sub} />)}</ul>
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
