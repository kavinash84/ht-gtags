/* eslint-disable radix */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import ResponsiveModal from 'components/Modal';

/**
 * Utils
 */
import { formatAmount } from 'utils/formatters';

const styles = require('./EmiModal.scss');

const schemes = [{
  schemeName: '12 by 3',
  emiTenure: 9,
  processingFee: 777,
  interest: 10,
  grossTenure: 12,
}, {
  schemeName: '9 by 2',
  emiTenure: 7,
  processingFee: 500,
  interest: 8,
  grossTenure: 9,
}, {
  schemeName: '6 by 1',
  emiTenure: 5,
  processingFee: 350,
  interest: 6,
  grossTenure: 6,
}, {
  schemeName: '3 by 0',
  emiTenure: 3,
  processingFee: 350,
  interest: 5,
  grossTenure: 3,
}];

const calculateEMI = (price, interest, emiTenure) => {
  // Computed as (CSP of the product * (1 +(X% / 12 * EMI Tenure)) / EMI Tenure)
  const percentage = interest / 100;
  const percentByMonth = percentage / 12;
  const group1 = 1 + (percentByMonth * emiTenure);
  const group2 = price * group1;
  return parseInt(group2 / emiTenure);
};

// eslint-disable-next-line max-len
const advancePayment = (specialPrice, interest, emiTenure, grossTenure) => calculateEMI(specialPrice, interest, emiTenure) * (grossTenure - emiTenure);
export default class Emi extends Component {
  state = {
    open: true
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { price, specialPrice } = this.props;
    let { data } = this.props;
    console.log(this.props, 'this.props');
    data = data && data.sort((a, b) => Number(a.bank_code) - Number(b.bank_code));
    return (
      <Box>
        <Button variant="link" color="primary" fontSize={16} fontFamily="medium" onClick={this.onOpenModal} mt={3}>
          Know more >
        </Button>
        <ResponsiveModal
          classNames={{ modal: styles.emiModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <Box className={styles.emiModalWrapper}>
            <Row ml={16} mr={16}>
              <Box col="12" textAlign="center">
                <Heading color="text" margin="0.9375em 0 0.3125em" fontFamily="700" textAlign="left">
                  Bajaj Finance For Rs.{` ${price}`}
                  <Box fontSize="0.875rem">(Including shipping charge)</Box>
                </Heading>
              </Box>
            </Row>

            <Row mr={16} ml={16} pl={0} pr={0}>
              <Box col="12" pt="1.25rem" paddingBottom="1.25rem" className={styles.tableWrapper}>
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <Box>Scheme Name</Box>
                      </th>
                      <th>
                        <Box>EMI Tenure</Box>
                      </th>
                      <th>
                        <Box>Processing Fee</Box>
                      </th>
                      <th>
                        <Box>% Interest</Box>
                      </th>
                      <th>
                        <Box>Advance EMI</Box>
                      </th>
                      <th>
                        <Box>Downpayment</Box>
                      </th>
                      <th>
                        <Box>EMI</Box>
                      </th>
                    </tr>

                    {schemes.map(arr => {
                      const {
                      schemeName, emiTenure, processingFee, interest, grossTenure
                      } = arr;

                      return (
                        <tr className={styles.coloumn}>
                          <td>
                            {schemeName}
                          </td>
                          <td>
                            {emiTenure} Months
                          </td>
                          <td>
                            Rs. {processingFee}
                          </td>
                          <td>
                            {interest}%
                          </td>
                          <td>
                            Rs. {advancePayment(specialPrice, interest, emiTenure, grossTenure)}
                          </td>
                          <td>
                            Rs. {processingFee + advancePayment(specialPrice, interest, emiTenure, grossTenure)}
                          </td>
                          <td>
                            Rs. {calculateEMI(specialPrice, interest, emiTenure)}
                          </td>
                        </tr>
                      );
                    })}

                    {/* {data.length > 0 &&
                      data.map((bank, index) => (
                        <tr key={String(index)} className={styles.coloumn}>
                          <td>
                            <Box className={styles.bankImgWrapper}>
                              <img src={bank.bank_logo_url} alt={bank.gateway_type} />
                            </Box>
                          </td>
                          {bank.slabs.map((slab, i) => {
                            const values = Object.values(slab.slab_keys);
                            return (
                              <td className="" key={String(i)}>
                                <Box>
                                  {values[3] && <p>Rs. {formatAmount(values[3])} p.m.</p>}
                                  {values[3] && <p>Interest Rate {values[0]}%</p>}
                                </Box>
                              </td>
                            );
                          })}
                        </tr>
                      ))} */}
                  </tbody>
                </table>
              </Box>
            </Row>
            <Row ml={16} mr={16}>
              <Box col="12" textAlign="center">
                <Heading color="text" margin="0.9375em 0 0.3125em" fontFamily="700" textAlign="left">
                  Bank Options For Rs.
                  {` ${price}`} <Box fontSize="0.875rem">(Including shipping charge)</Box>
                </Heading>
              </Box>
            </Row>
            <Row mr={16} ml={16} pl={0} pr={0}>
              <Box col="12" pt="1.25rem" paddingBottom="1.25rem" className={styles.tableWrapper}>
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <Box />
                      </th>
                      <th>
                        <Box>3 Months</Box>
                      </th>
                      <th>
                        <Box>6 Months</Box>
                      </th>
                      <th>
                        <Box>9 Months</Box>
                      </th>
                      <th>
                        <Box>12 Months</Box>
                      </th>
                      <th>
                        <Box>18 Months</Box>
                      </th>
                      <th>
                        <Box>24 Months</Box>
                      </th>
                    </tr>

                    {data.length > 0 &&
                      data.map((bank, index) => (
                        <tr key={String(index)} className={styles.coloumn}>
                          <td>
                            <Box className={styles.bankImgWrapper}>
                              <img src={bank.bank_logo_url} alt={bank.gateway_type} />
                            </Box>
                          </td>
                          {bank.slabs.map((slab, i) => {
                            const values = Object.values(slab.slab_keys);
                            return (
                              <td className="" key={String(i)}>
                                <Box>
                                  {values[3] && <p>Rs. {formatAmount(values[3])} p.m.</p>}
                                  {values[3] && <p>Interest Rate {values[0]}%</p>}
                                </Box>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Box>
            </Row>
          </Box>
        </ResponsiveModal>
      </Box>
    );
  }
}

Emi.defaultProps = {
  data: [],
  price: '',
  specialPrice: ''
};

Emi.propTypes = {
  data: PropTypes.array,
  price: PropTypes.string,
  specialPrice: PropTypes.string
};
