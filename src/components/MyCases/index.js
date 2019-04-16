import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DatePicker from 'react-datepicker';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
// import { isEmpty } from 'utils/validation';
// import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
import MyMenu from 'components/MyMenu';
import 'react-datepicker/dist/react-datepicker.css';

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
            <Row display="block" mr="0" ml="0">
              {data.map((item, index) => (
                <Div col="12" key={String(index)} mb="20px">
                  <Button
                    ta="left"
                    size="block"
                    border="1px solid rgba(151, 151, 151, 0.47)"
                    bc="rgba(151, 151, 151, 0.47)"
                    btnType="btnOutline"
                    onClick={() => this.handleClick(index)}
                  >
                    <Row m="0">
                      <Div>
                        <Label fontSize="1.25em" mb="5px">
                          <b>{item.category || ''}</b>
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>Description:</b> {item.description || ''}
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>Origin:</b> {item.origin || ''}
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>Status:</b> {item.status || ''}
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>SubCategory:</b> {item.subcategory || ''}
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>Subject:</b> {item.subject || ''}
                        </Label>
                      </Div>
                    </Row>
                    <Row m="0">
                      <Div>
                        <Label fontSize="0.875rem" mb="5px">
                          <b>Type:</b> {item.type || ''}
                        </Label>
                      </Div>
                    </Row>
                  </Button>
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
