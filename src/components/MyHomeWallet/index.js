/* eslint-disable no-tabs */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * Components
 */
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Select from 'react-select';

const MyWalletViewRow = ({ title, value }) => (
  <Row mb={20}>
    <Col variant="col-3">
      <Label fontFamily="light">{title}</Label>
    </Col>
    <Col variant="col-7">
      <Label>{value}</Label>
    </Col>
  </Row>
);

MyWalletViewRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export class MyHomeWallet extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  render() {
    return (
      <Box>
        <Box>
          <Heading
            fontSize={20}
            color="textDark"
            pb={16}
            mb={30}
            sx={{
              borderBottom: 'divider'
            }}
          >
            Hometown Wallet Details
          </Heading>
          <Box>
            <MyWalletViewRow title="Creation Date" value={'27-05-2021'} />
            <MyWalletViewRow title="Balance" value={'₹ 2,000'} />
            <MyWalletViewRow title="Topup Limit" value={'₹ 10,000'} />
          </Box>
          <Box>
            <Button variant="outline.primary" mt={20}>
              Transaction history
            </Button>
          </Box>
          <Box>
            <Box mt={50}>
              <Box>
                <Heading
                  fontSize={20}
                  color="textDark"
                  pb={16}
                  mb={30}
                  sx={{
                    borderBottom: 'divider'
                  }}
                >
                  Transaction History
                </Heading>
              </Box>
              <Row mr={0} ml={0} mb="1.5rem">
                <Box mr="1rem" width="25%" float="left">
                  <Select
                    placeholder="Select From Date"
                    defaultValue={null}
                    // value={this.state.dateFilter}
                    // onChange={this.onChangeDate}
                    // options={getDateFilters(this.FILTER_CONFIG)}
                  />
                </Box>
                <Box mr="1rem" width="25%" float="left">
                  <Select
                    placeholder="Select To Date"
                    defaultValue={null}
                    // value={this.state.caseStatus}
                    // onChange={this.onStatusChange}
                    // options={this.STATUS_FILTER}
                  />
                </Box>
                <Box mr="1rem" width="8.33%">
                  <Button
                    // disabled={loading}
                    // onClick={this.getFilteredCases}
                    border="1px solid"
                    color="colors.white"
                    lh="1.5"
                    size="block"
                    btnType="primary"
                    bg="rgb(249, 141, 41)"
                    height="38px"
                    fontSize="16px"
                  >
                    {false ? 'Please Wait ...' : 'Find'}
                  </Button>
                </Box>
              </Row>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyHomeWallet);
