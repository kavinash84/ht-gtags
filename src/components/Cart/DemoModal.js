import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Section from 'hometown-components-dev/lib/SectionHtV1';
import { formatAmount } from 'utils/formatters';
import ResponsiveModal from 'components/Modal';
import DemoForm from './DemoForm';
import { Link } from 'react-router-dom';

@connect(({ cart }) => ({
  cart
}))
export default class DemoModal extends Component {
  state = {
    openDemo: false
  };
  handleModal = () => {
    this.setState({ openDemo: !this.state.openDemo });
  };
  render() {
    const { totalCart } = this.props;
    const { openDemo } = this.state;
    const { onClickProceed, loadingnextstep, isSubmitted, outOfStockList, btnText, selectedForDemo } = this.props;

    return (
      <Section mb="0" p="0.5rem 0.5rem 0.625rem" mt="0px">
        {!openDemo && (
          <Container type="container" pr="0.3125rem" pl="0.3125rem">
            {/* {selectedForDemo ? (
              <div
                style={{ padding: '10px', color: '#F47020', fontSize: '14px', width: '100%', textAlign: 'center', lineHeight: '20px', cursor: 'pointer' }}
                onClick={() => {
                  this.handleModal();
                }}
              >
               
                CLICK HERE TO SCHEDULE VIRTUAL DEMO
                
              </div>
            ) : null} */}
          </Container>
        )}
        <ResponsiveModal classNames={{ modal: 'mkModal' }} onCloseModal={this.handleModal} open={this.state.openDemo}>
          {openDemo && <DemoForm handleModal={this.handleModal} />}
        </ResponsiveModal>
      </Section>
    );
  }
}
