import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { paragStyles, createOptions, buttonStyles, formStyles } from "./Style";
class CheckOutForm extends Component {
  state = {
    error: undefined,
  };

  handleSubmit = (e) => {
    const { stripe,setPAymentToken } = this.props;
    e.preventDefault()
    if (stripe) {
      stripe.createToken().then((payload) => {
        if (payload.error) {
            setPAymentToken(undefined)
        return  this.setState({
            error: payload.error.message,
          });
        }
        payload && setPAymentToken(payload.token.id)
      });
    } else {
      console.error("Stripe.js hasent loaded yet");
    }
  };
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} {...formStyles()}>
        <CardElement {...createOptions()} />
        <p {...paragStyles()}>You will be not Charge yet</p>
        {error && (
          <div className='alert alert-danger alert-payment'>{error}</div>
        )}
        <button {...buttonStyles()} className='btn btn bg-success'>
          Confirl Payment
        </button>
      </form>
    );
  }
}

export default injectStripe(CheckOutForm);
