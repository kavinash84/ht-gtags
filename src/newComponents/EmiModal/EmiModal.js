import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ResponsiveModal from 'newComponents/Modal';
import { formatAmount } from 'utils/formatters';

const styles = require('./EmiModal.scss');

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
    const { price } = this.props;
    let { data } = this.props;
    data = data && data.sort((a, b) => Number(a.bank_code) - Number(b.bank_code));
    return (
      <BoxHtV1>
        <ButtonHtV1 px={10} variant="link" color="primary" onClick={this.onOpenModal}>
          Know more >
        </ButtonHtV1>
        <ResponsiveModal
          classNames={{ modal: styles.emiModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <BoxHtV1 className={styles.emiModalWrapper}>
            <RowHtV1 ml={16} mr={16}>
              <BoxHtV1 col="12" textAlign="center">
                <HeadingHtV1 color="text" margin="0.9375em 0 0.3125em" fontFamily="700" textAlign="left">
                  EMI Options For Rs.
                  {` ${price}`} <BoxHtV1 fontSize="0.875rem">(Including shipping charge)</BoxHtV1>
                </HeadingHtV1>
              </BoxHtV1>
            </RowHtV1>
            <RowHtV1 mr={16} ml={16} pl={0} pr={0}>
              <BoxHtV1 col="12" pt="1.25rem" paddingBottom="1.25rem" className={styles.tableWrapper}>
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <BoxHtV1 />
                      </th>
                      <th>
                        <BoxHtV1>3 Months</BoxHtV1>
                      </th>
                      <th>
                        <BoxHtV1>6 Months</BoxHtV1>
                      </th>
                      <th>
                        <BoxHtV1>9 Months</BoxHtV1>
                      </th>
                      <th>
                        <BoxHtV1>12 Months</BoxHtV1>
                      </th>
                      <th>
                        <BoxHtV1>18 Months</BoxHtV1>
                      </th>
                      <th>
                        <BoxHtV1>24 Months</BoxHtV1>
                      </th>
                    </tr>

                    {data.length > 0 &&
                      data.map((bank, index) => (
                        <tr key={String(index)} className={styles.coloumn}>
                          <td>
                            <BoxHtV1 className={styles.bankImgWrapper}>
                              <img src={bank.bank_logo_url} alt={bank.gateway_type} />
                            </BoxHtV1>
                          </td>
                          {bank.slabs.map((slab, i) => {
                            const values = Object.values(slab.slab_keys);
                            return (
                              <td className="" key={String(i)}>
                                <BoxHtV1>
                                  {values[3] && <p>Rs. {formatAmount(values[3])} p.m.</p>}
                                  {values[3] && <p>Interest Rate {values[0]}%</p>}
                                </BoxHtV1>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </BoxHtV1>
            </RowHtV1>
          </BoxHtV1>
        </ResponsiveModal>
      </BoxHtV1>
    );
  }
}

Emi.defaultProps = {
  data: [],
  price: ''
};

Emi.propTypes = {
  data: PropTypes.array,
  price: PropTypes.string
};
