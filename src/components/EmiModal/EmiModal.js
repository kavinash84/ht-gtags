import React, { Component } from 'react';
// import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
// import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';

export default class TrackOrderModal extends Component {
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
    const styles = require('./EmiModal.scss');
    return (
      <div>
        <Button p="0" ml="1.25rem" onClick={this.onOpenModal}>
          EMI Modal
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
                  EMI Options For Rs.55,000 <Span fontSize="0.875rem">(Including shipping charge)</Span>
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
                    <tr className={styles.coloumn}>
                      <td>
                        <div className={styles.bankImgWrapper}>
                          <img
                            src="https://static.hometown.in/media/cms/BankLOGO/citi.gif"
                            alt="citibank"
                            title="citibank"
                          />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 10,183 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 5,174 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 3,533 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 2,699 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 1,865 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="lowestEmi">
                        <div>
                          <p>Rs.1,450 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                    </tr>
                    <tr className={styles.coloumn}>
                      <td>
                        <div className={styles.bankImgWrapper}>
                          <img
                            src="https://static.hometown.in/media/cms/BankLOGO/citi.gif"
                            alt="citibank"
                            title="citibank"
                          />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 10,183 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 5,174 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 3,533 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 2,699 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 1,865 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="lowestEmi">
                        <div>
                          <p>Rs.1,450 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                    </tr>
                    <tr className={styles.coloumn}>
                      <td>
                        <div className={styles.bankImgWrapper}>
                          <img
                            src="https://static.hometown.in/media/cms/BankLOGO/citi.gif"
                            alt="citibank"
                            title="citibank"
                          />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 10,183 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p />
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 5,174 p.m.</p>
                          <p>Interest Rate 13%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 3,533 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 2,699 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="">
                        <div>
                          <p>Rs. 1,865 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                      <td className="lowestEmi">
                        <div>
                          <p>Rs.1,450 p.m.</p>
                          <p>Interest Rate 15%</p>
                        </div>
                      </td>
                    </tr>
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
