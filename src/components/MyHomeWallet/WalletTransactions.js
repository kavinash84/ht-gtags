import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';

// redux
import { getTransactionHistory as load } from 'redux/modules/profile';

// selectors - utils
import { getTransactionHistory } from 'selectors/userprofile';
import { formatAmount } from 'utils/formatters';

// Component
import Row from 'hometown-components-dev/lib/RowHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const styles = require('./index.scss');

const RightArrowRed = require('../../../static/arrow_forward_red.svg');
const RightArrow = require('../../../static/forward-arrow.svg');

const formatDate = date => moment(date, 'DD-MM-YYYY h:mm:ss').format('DD/MM/YYYY');

const validateDate = (from, to) => {
  if (from && to) return false;
  return true;
};

@connect(({ profile }) => ({
  profile: profile.data,
  transactionHistory: getTransactionHistory(profile),
  hasMoreTrans: profile.hasMoreTrans
}))
export class WalletTransactions extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      fromDate: PropTypes.number,
      toDate: PropTypes.number
    }),
    transactionHistory: PropTypes.array,
    hasMoreTrans: PropTypes.bool.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    profile: PropTypes.shape({
      fromDate: '',
      toDate: ''
    }),
    transactionHistory: []
  };

  state = {
    fromDate: '',
    toDate: '',
    count: 5,
    pageNo: 1
  };

  onChangeToDate = value => {
    this.setState({
      toDate: value
    });
  };

  onChangeFromDate = value => {
    this.setState({
      fromDate: value
    });
  };

  getTransaction = (e, pageNo) => {
    e.preventDefault();
    const { dispatch } = this.context.store;
    const { toDate, fromDate, count } = this.state;

    this.setState({ pageNo });

    dispatch(load({
        toDate: moment(toDate).format('DD/MM/YYYY'),
        fromDate: moment(fromDate).format('DD/MM/YYYY'),
        count,
        pageNo
      }));
  };

  render() {
    const { transactionHistory: history, hasMoreTrans } = this.props;
    const { toDate, fromDate, pageNo } = this.state;
    console.log({ history });
    return (
      <div>
        <Row justifyContent="space-between" mb="1.5rem" ml="0" mr="0">
          <Div style={{ width: '40%' }}>
            <Div>
              <DatePicker dateFormat="dd/MM/yyyy" selected={fromDate} onSelect={this.onChangeFromDate} />
            </Div>
            <Div>
              <Text mt="0.313rem" ml="0.625rem" color="#999999" fontSize="14px">
                From Date
              </Text>
            </Div>
          </Div>
          <Div style={{ width: '40%' }}>
            <Div>
              <DatePicker dateFormat="dd/MM/yyyy" selected={toDate} onSelect={this.onChangeToDate} />
            </Div>
            <Div>
              <Text mt="0.313rem" ml="0.625rem" color="#999999" fontSize="14px">
                To Date
              </Text>
            </Div>
          </Div>
          <Div>
            <Button
              width="4rem"
              height="38px"
              className={styles.searchTransactions}
              disabled={validateDate(toDate, fromDate)}
              borderRadius="5px"
              onClick={e => this.getTransaction(e, pageNo)}
            >
              <Image width={20} height={10} src={RightArrowRed} alt="Find" />
            </Button>
          </Div>
        </Row>

        <div className={styles.divider} />

        {history.length ? (
          history.map(arr => (
            <Row key={arr.ID} m="1rem 0" bg="white" p="0.625rem">
              <Div col="9">
                <Text>{arr.WalletOwner}</Text>
                <Text fontSize="0.75rem" color="#999999">
                  TID: {arr.ID}
                </Text>
              </Div>
              <Div col="3">
                {/* <Text ta="right" color="red" fontFamily="medium">
                  - ₹ {formatAmount(arr.Amount)}
                </Text> */}
                {arr.TransType === 'Debit' ? (
                  <Text textAlign="right" color="red" fontFamily="medium">
                    - ₹ {formatAmount(arr.Amount)}
                  </Text>
                ) : (
                  <Text textAlign="right" color="#21CDA9" fontFamily="medium">
                    + ₹ {formatAmount(arr.Amount)}
                  </Text>
                )}
                <Text fontSize="0.75rem" color="#999999" ta="right">
                  {formatDate(arr.TransDate)}
                </Text>
              </Div>
            </Row>
          ))
        ) : (
          <Row m="1rem 0" bg="white" p="0.625rem">
            <Text>No Transactions Found</Text>
          </Row>
        )}

        {hasMoreTrans ? (
          <Div>
            <Row justifyContent="center" alignItems="center" onClick={e => this.getTransaction(e, 1 + pageNo)}>
              <Text fontFamily="medium">SHOW MORE</Text>
              <Image src={RightArrow} alt="Find" ml="5px" height="10px" width="20px" />
            </Row>
          </Div>
        ) : null}
      </div>
    );
  }
}

export default WalletTransactions;
