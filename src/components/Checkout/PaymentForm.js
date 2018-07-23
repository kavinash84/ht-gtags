import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ paymentoptions }) => ({
  data: paymentoptions.formData,
  error: paymentoptions.error
});

class PaymentForm extends Component {
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.array
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: null,
    error: []
  };

  componentDidUpdate() {
    const { data: { form_data: formData }, error } = this.props;
    if (formData && !error) {
      console.log(this.paymentForm);
      this.paymentForm.submit();
    }
  }

  render() {
    const { data: { form_data: { action, fields } } } = this.props;
    if (!action && !fields) {
      return <span />;
    }
    const formFields = Object.entries(fields);
    console.log(formFields);
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
