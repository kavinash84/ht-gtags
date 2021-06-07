import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import ResponsiveModal from 'components/Modal';

/**
 * modules / selectors / helpers
 */
import { formatAmount } from 'utils/formatters';
import { submitBflPaymentDetails, setSelectedPaymentDetails } from 'redux/modules/paymentoptions';
import { setEmiPaymentType, paymentLoaded } from 'redux/modules/app';

class BajajFinance extends Component {
  static propTypes = {
    submitPaymentDetails: PropTypes.func.isRequired,
    setPaymentDetails: PropTypes.func.isRequired,
    session: PropTypes.string,
    selectedGateway: PropTypes.string,
    emiType: PropTypes.func.isRequired,
    paymentLoaded: PropTypes.func.isRequired,
    details: PropTypes.string,
    bflMinAmount: PropTypes.number.isRequired
  };

  static defaultProps = {
    session: '',
    details: '',
    selectedGateway: 'EmiZero'
  };
  constructor(props) {
    super(props);
    this.state = {
      countDown: 5,
      countDownId: '',
      bflModal: false
    };
  }

  openBflModal = () => {
    console.log('openBflModal function triggered');
    const {
      submitPaymentDetails,
      session,
      selectedGateway,
      emiType,
      paymentLoaded: paymentload,
      setPaymentDetails
    } = this.props;

    setPaymentDetails({
      gateway: 'EmiZero',
      data: { emiCode: 'BFL', emiBank: 'bfl', cardType: 'credit' }
    });

    const countDownId = setInterval(() => {
      let { countDown } = this.state;
      countDown -= 1;

      console.log('Countdown value', countDown, countDownId);
      if (countDown === 0) {
        this.closeBflModal();
        emiType('bfl');
        paymentload(false);
        submitPaymentDetails(session, selectedGateway);
        window.clearInterval(countDownId);
      } else {
        this.setState({ countDown });
      }
    }, 1000);
    this.setState({ countDownId, bflModal: true });
  };

  closeBflModal = () => {
    const { countDownId } = this.state;
    const { setPaymentDetails } = this.props;
    window.clearInterval(countDownId);
    this.setState({ bflModal: false, countDown: 5, countDownId: '' });
    setPaymentDetails({
      gateway: 'EmiZero',
      data: { emiCode: '', emiBank: '', cardType: '' }
    });
  };

  render() {
    const { countDown, bflModal } = this.state;
    const {
      details: { emiCode },
      bflMinAmount
    } = this.props;
    return (
      <Box>
        <Box pb={20}>
          <Label>Available for Bajaj EMI Card Holders for order value &gt; Rs {formatAmount(bflMinAmount)}</Label>
        </Box>
        <Col px={0} mb={30} pb={20} sx={{ borderBottom: '2px solid #97979733' }} onClick={this.openBflModal}>
          <Flex alignItems="center">
            <Box as="input" type="radio" name="bankOptions" id={'bankOptionsBfl'} checked={emiCode === 'BFL'} mr={10} />
            <Label for={'bankOptionsBfl'} bg="white">
              <Image
                src={
                  // eslint-disable-next-line max-len
                  'data:image/png;base64,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'
                }
                alt="Bajaj Finserv"
                maxHeight={24}
                sx={{ flexShrink: 0 }}
              />
            </Label>
          </Flex>
        </Col>

        <ResponsiveModal classNames={{ modal: 'bflModal' }} open={bflModal} onCloseModal={this.closeBflModal}>
          <Box py={32} px={32}>
            <Text pt={10}>Redirecting you to Bajaj Finance Payment Gateway</Text>
            <Text pt={10} textAlign="center">
              {countDown}
            </Text>
          </Box>
        </ResponsiveModal>
      </Box>
    );
  }
}

const mapStateToProps = ({ app, paymentoptions }) => ({
  session: app.sessionId,
  selectedGateway: paymentoptions.selectedGateway,
  details: paymentoptions.paymentMethodDetails.EmiZero
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitPaymentDetails: submitBflPaymentDetails,
      setPaymentDetails: setSelectedPaymentDetails,
      emiType: setEmiPaymentType,
      paymentLoaded
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BajajFinance);
