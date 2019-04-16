import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import DatePicker from 'react-datepicker';
import MyMenu from 'components/MyMenu';
import Button from 'hometown-components/lib/Buttons';
import 'react-datepicker/dist/react-datepicker.css';
import OrderBlock from './OrderBlock';
// import ProductItems from '../../data/RecentlyViewedProducts.js';

const mapStateToProps = ({ orders }) => ({
  results: orders.data
});

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      caseStatus: ''
    };
  }
  onStatusChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      caseStatus: value || ''
    });
  };
  getFilteredCases = e => {
    e.preventDefault();
    const { startDate, endDate, caseStatus } = this.state;
    console.log(`${startDate}${endDate}${caseStatus}`);
  };
  startDateHandler = date => {
    this.setState({
      startDate: date
    });
  };
  endDateHandler = date => {
    this.setState({
      endDate: date
    });
  };
  render() {
    const { results } = this.props;
    return (
      <Div type="block">
        <MyMenu page="order" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="0" ml="0" mb="1.5rem">
              <Div col="3" pr="10px">
                <Label display="block" fontSize="0.875em" mb="0.625rem">
                  Start
                </Label>
                <DatePicker selected={this.state.startDate} onChange={this.startDateHandler} />
              </Div>
              <Div col="3" pl="5px" pr="5px">
                <Label display="block" fontSize="0.875em" mb="0.625rem">
                  End
                </Label>
                <DatePicker selected={this.state.endDate} onChange={this.endDateHandler} />
              </Div>
              <Div col="3" pl="5px" pr="5px">
                <Label display="block" fontSize="0.875em" mb="0.625rem">
                  Status
                </Label>
                <select onChange={this.onStatusChange} className="form-control" name="caseType">
                  <option value={null}>None</option>
                  <option value="Open">Open</option>
                  <option value="In-Process">In-Process</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </Div>
              <Div col="1" pl="10px" mt="30px">
                <Button
                  onClick={this.getFilteredCases}
                  border="1px solid"
                  color="red"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  btnColor="#515151"
                  height="38px"
                  fontSize="16px"
                >
                  Find
                </Button>
              </Div>
            </Row>
            {results.map(item => <OrderBlock key={item.order_id} order={item} />)}
          </Container>
        </Section>
      </Div>
    );
  }
}
MyOrder.defaultProps = {
  results: []
};
MyOrder.propTypes = {
  results: PropTypes.array
};
export default connect(
  mapStateToProps,
  null
)(MyOrder);
