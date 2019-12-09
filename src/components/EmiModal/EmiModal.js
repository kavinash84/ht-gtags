import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Span from 'hometown-components-dev/lib/Span';
import Button from 'hometown-components-dev/lib/Buttons';
import Heading from 'hometown-components-dev/lib/Heading';
import ResponsiveModal from 'components/Modal';
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
      <Span>
        <Button
          p="0"
          ml="0.3125rem"
          btnType="link"
          fontSize="0.75rem"
          color="#29d"
          onClick={this.onOpenModal}
          mt="-5px"
        >
          View Plans
        </Button>
        <ResponsiveModal
          classNames={{ modal: styles.emiModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.emiModalWrapper}>
            <Row mr="1rem" ml="1rem">
              <Div col="12" ta="center">
                <Heading color="text" mt="0.9375em" mb="0.3125em" fontFamily="700" ta="left">
                  EMI Options For Rs.
                  {` ${price}`} <Span fontSize="0.875rem">(Including shipping charge)</Span>
                </Heading>
              </Div>
            </Row>
            <Row mr="1rem" ml="1rem" pl="0" pr="0">
              <Div col="12" pt="1.25rem" pb="1.25rem" className={styles.tableWrapper}>
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <div />
                      </th>
                      <th>
                        <div>3 Months</div>
                      </th>
                      <th>
                        <div>6 Months</div>
                      </th>
                      <th>
                        <div>9 Months</div>
                      </th>
                      <th>
                        <div>12 Months</div>
                      </th>
                      <th>
                        <div>18 Months</div>
                      </th>
                      <th>
                        <div>24 Months</div>
                      </th>
                    </tr>

                    {data.length > 0 &&
                      data.map((bank, index) => (
                        <tr key={String(index)} className={styles.coloumn}>
                          <td>
                            <div className={styles.bankImgWrapper}>
                              <img src={bank.bank_logo_url} alt={bank.gateway_type} />
                            </div>
                          </td>
                          {bank.slabs.map((slab, i) => {
                            const values = Object.values(slab.slab_keys);
                            return (
                              <td className="" key={String(i)}>
                                <div>
                                  {values[3] && <p>Rs. {formatAmount(values[3])} p.m.</p>}
                                  {values[3] && <p>Interest Rate {values[0]}%</p>}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Div>
            </Row>
          </div>
        </ResponsiveModal>
      </Span>
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
