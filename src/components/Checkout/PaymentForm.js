import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ paymentoptions }) => ({
  data: paymentoptions.formData
});

class PaymentForm extends Component {
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.bool
  };

  static defaultProps = {
    data: null,
    error: false
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    const { data, error } = this.props;
    if (data && data !== null && !error) {
      this.paymentForm.submit();
    }
  }

  render() {
    const { data: { form_data: { action, fields } } } = this.props;
    if (action && fields) {
      return <span />;
    }
    const formFields = Object.entries(fields);
    return (
      <form
        ref={form => {
          this.paymentForm = form;
        }}
        className="hide"
        action={action}
        encType="application/x-www-form-urlencoded"
      >
        {formFields.map(field => <input key={field[0]} type="hidden" name={field[0]} value={field[1]} />)}
      </form>
    );
  }
}

export default connect(mapStateToProps)(PaymentForm);
