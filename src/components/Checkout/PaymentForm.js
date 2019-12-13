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
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: null,
    error: {}
  };

  componentDidUpdate() {
    if (this.props.data && this.props.data.form_data) {
      const {
        data: { form_data: formData },
        error
      } = this.props;
      if (formData && !error) {
        this.paymentForm.submit();
      }
    }
  }

  render() {
    const { data } = this.props;
    if (data && data.form_data) {
      const {
        data: {
          form_data: { action, fields }
        }
      } = this.props;
      if (!action && !fields) {
        return <span />;
      }
      const formFields = Object.entries(fields);
      return (
        <form
          ref={form => {
            this.paymentForm = form;
          }}
          method="POST"
          className="hide"
          action={action}
          encType="application/x-www-form-urlencoded"
        >
          {formFields.map(field => (
            <input key={field[0]} type="hidden" name={field[0]} value={field[1]} />
          ))}
        </form>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps)(PaymentForm);
