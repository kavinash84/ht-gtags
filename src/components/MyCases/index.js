import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DatePicker from 'react-datepicker';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
// import { isEmpty } from 'utils/validation';
// import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
import MyMenu from 'components/MyMenu';
import 'react-datepicker/dist/react-datepicker.css';

const styles = require('./MyCases.scss');

@connect(({ mycases, profile }) => ({
  ...mycases,
  useremail: profile.data.email,
  mycases
}))
@withRouter
export default class MyCases extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
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
    const { data, useremail } = this.props;
    const { loading } = this.props;
    console.log(useremail);
    console.log(loading);
    return (
      <Div type="block" mb="2rem">
        <MyMenu page="address" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              <Div col="3">
                <DatePicker selected={this.state.startDate} onChange={this.startDateHandler} />
              </Div>
              <Div col="3">
                <DatePicker selected={this.state.endDate} onChange={this.endDateHandler} />
              </Div>
              <Div col="3">
                <select onChange={this.onStatusChange} className="form-control" name="caseType">
                  <option value={null}>None</option>
                  <option value="Open">Open</option>
                  <option value="In-Process">In-Process</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </Div>
              <Div col="3">
                <Button
                  onClick={this.getFilteredCases}
                  btnType="custom"
                  border="1px solid"
                  bc="white"
                  color="red"
                  p="4px 8px"
                  lh="1.5"
                >
                  Find
                </Button>
              </Div>
            </Row>
            <Row display="block" mr="0" ml="0">
              {data.map((item, index) => (
                <Div col="4" pr="0.625rem" key={String(index)}>
                  <button className={`${styles.addressBtn}`} onClick={() => this.handleClick(index)}>
                    <b>{item.category || ''}</b>
                    <br />
                    <p>Description : {item.description || ''} </p>
                    <br />
                    <p>Origin: {item.origin || ''} </p>
                    <br />
                    <p> Status: {item.status || ''} </p>
                    <br />
                    <p> SubCategory: {item.subcategory || ''} </p>
                    <br />
                    <p> Subject: {item.subject || ''} </p>
                    <br />
                    <p> Type: {item.type || ''} </p>
                  </button>
                </Div>
              ))}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

MyCases.defaultProps = {
  data: [],
  useremail: '',
  loading: false,
  updated: false
};

MyCases.propTypes = {
  data: PropTypes.object,
  useremail: PropTypes.string,
  loading: PropTypes.bool,
  updated: PropTypes.bool //eslint-disable-line
};
