import React from 'react';

const Checkout = (props) => {
  const orderId = props.match.params.orderId;
  return (
    <div className='checkout-component'>
      <div className='checkout-wrapper'>
        <div>Thank you for purchasing!</div>
        <div>Your order number is {orderId}</div>
        <div>Your order will be shipped soon.</div>
      </div>
    </div>
  );
};

export default Checkout;
