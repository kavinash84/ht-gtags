/* eslint-disable radix */
import React, { Component } from "react";
import PropTypes from "prop-types";
/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import ResponsiveModal from "components/Modal";

/**
 * Utils
 */
import { formatAmount } from "utils/formatters";

const styles = require("./EmiModal.scss");
const bajajFinance = require("../../../static/bajaj-finance.png");

const schemes = [
  {
    schemeName: "9 by 0",
    emiTenure: 9,
    processingFee: 0,
    interest: 0,
    grossTenure: 9
  },
  {
    schemeName: "6 by 0",
    emiTenure: 6,
    processingFee: 0,
    interest: 0,
    grossTenure: 6
  },
  {
    schemeName: "3 by 0",
    emiTenure: 3,
    processingFee: 0,
    interest: 0,
    grossTenure: 3
  }
];

// Computed as (CSP of the product * (1 +(X% / 12 * EMI Tenure)) / EMI Tenure)
// B16*(1+B20/12*B21)/B21
/* eslint-disable-next-line no-mixed-operators */
const calculateEMI = (price, interest, emiTenure) =>
  parseInt((price * (1 + (interest / 12) * emiTenure)) / emiTenure);

// eslint-disable-next-line max-len
const advancePayment = (specialPrice, interest, emiTenure, grossTenure) =>
  calculateEMI(specialPrice, interest, emiTenure) * (grossTenure - emiTenure);
export default class Emi extends Component {
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { price, specialPrice, bflMinAmount } = this.props;
    let { data } = this.props;
    console.log(this.props, "this.props");
    data =
      data && data.sort((a, b) => Number(a.bank_code) - Number(b.bank_code));
    return (
      <Box>
        <Button
          ml="0"
          variant="link"
          fontFamily="regular"
          fontSize="10px"
          onClick={this.onOpenModal}
        >
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
                <Heading
                  color="text"
                  margin="0.9375em 0 0.3125em"
                  fontFamily="700"
                  textAlign="left"
                >
                  Bajaj Finance For Rs.{` ${price}`}
                  <Box fontSize="0.875rem" mt={5}>
                    Available for Bajaj EMI Card Customers. Minimum Cart Value
                    is Rs. {formatAmount(bflMinAmount)}
                  </Box>
                  <Box fontSize="0.875rem">(Including shipping charge)</Box>
                </Heading>
              </Box>
            </Row>

            <Row mr={16} ml={16} pl={0} pr={0}>
              <Box
                col="12"
                pt="1.25rem"
                paddingBottom="1.25rem"
                className={styles.tableWrapper}
              >
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th />
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
                        schemeName,
                        emiTenure,
                        processingFee,
                        interest,
                        grossTenure
                      } = arr;

                      return (
                        <tr className={styles.coloumn}>
                          <td>
                            <Box>
                              <img
                                height={30}
                                src={bajajFinance}
                                alt="baja-finance"
                              />
                            </Box>
                          </td>
                          <td>{schemeName}</td>
                          <td>{emiTenure} Months</td>
                          <td>Rs. {processingFee}</td>
                          <td>{interest}%</td>
                          <td>
                            Rs.{" "}
                            {advancePayment(
                              specialPrice,
                              interest,
                              emiTenure,
                              grossTenure
                            )}
                          </td>
                          <td>
                            Rs.{" "}
                            {processingFee +
                              advancePayment(
                                specialPrice,
                                interest,
                                emiTenure,
                                grossTenure
                              )}
                          </td>
                          <td>
                            Rs.{" "}
                            {calculateEMI(specialPrice, interest, emiTenure)}
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
                <Heading
                  color="text"
                  margin="0.9375em 0 0.3125em"
                  fontFamily="700"
                  textAlign="left"
                >
                  Bank Options For Rs.
                  {` ${price}`}{" "}
                  <Box fontSize="0.875rem">(Including shipping charge)</Box>
                </Heading>
              </Box>
            </Row>
            <Row mr={16} ml={16} pl={0} pr={0}>
              <Box
                col="12"
                pt="1.25rem"
                paddingBottom="1.25rem"
                className={styles.tableWrapper}
              >
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <Box />
                      </th>
                      <th>
                        <Box>Minimum Amt.</Box>
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
                      <th>
                        <Box>36 Months</Box>
                      </th>
                    </tr>

                    {data.length > 0 &&
                      data.map((bank, index) => (
                        <tr key={String(index)} className={styles.coloumn}>
                          <td>
                            <Box className={styles.bankImgWrapper}>
                              <img
                                src={bank.bank_logo_url}
                                alt={bank.gateway_type}
                              />
                            </Box>
                          </td>
                          <td>
                            <Box className={styles.bankImgWrapper}>
                              INR {bank.min_order_amt}
                            </Box>
                          </td>
                          {bank.slabs.map((slab, i) => {
                            const values = Object.values(slab.slab_keys);
                            return (
                              <td className="" key={String(i)}>
                                <Box>
                                  {values[3] && (
                                    <p>Rs. {formatAmount(values[3])} p.m.</p>
                                  )}
                                  {values[3] && (
                                    <p>Interest Rate {values[0]}%</p>
                                  )}
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
  price: "",
  specialPrice: ""
};

Emi.propTypes = {
  data: PropTypes.array,
  price: PropTypes.string,
  specialPrice: PropTypes.string,
  bflMinAmount: PropTypes.number.isRequired
};
