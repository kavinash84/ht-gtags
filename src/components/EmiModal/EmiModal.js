import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
// import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';

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
    const { data, price } = this.props;
    return (
      <div>
        <Button p="0" ml="1.25rem" onClick={this.onOpenModal}>
          EMI
        </Button>
        <ResponsiveModal
          classNames={{ modal: styles.emiModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.emiModalWrapper}>
            <Row mr="1rem" ml="1rem">
              <Div col="12" ta="center">
                <Heading color="text" mt="0.9375em" mb="0.3125em" fontWeight="700" ta="left">
                  EMI Options For Rs.
                  {price} <Span fontSize="0.875rem">(Including shipping charge)</Span>
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
                        <div>4 Months</div>
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
                    {/* eslint-disable */}

                    {data.map(bank => (
                      <tr className={styles.coloumn}>
                        <td>
                          <div className={styles.bankImgWrapper}>
                            <img src={bank.bank_logo_url} alt={bank.gateway_type} />
                          </div>
                        </td>
                        {bank.slabs.map((slab, month) => {
                          const values = Object.values(slab.slab_keys);
                          return (
                            <td className="">
                              <div>
                                {values[3] && <p>Rs. {values[3]} p.m.</p>}
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
      </div>
    );
  }
}

Emi.propTypes = {
  data: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};
