import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Checkout = (props) => {
  const orderId = props.match.params.orderId;
  return (
    <div className='checkout-component'>
      <div className='checkout-wrapper'>
        <h2 className='order-confirmed'> Your order is confirmed!</h2>
        <div className='order-num'>{`Order #105-74551235-69987523${orderId}`}</div>
        <img
          className='checkout-img'
          src='https://media.istockphoto.com/vectors/paid-success-payment-approved-notice-icon-vector-flat-bill-tax-pay-vector-id1271278705?k=20&m=1271278705&s=612x612&w=0&h=0YdsBj21lQdzQU1rUE79Vp5P2HczAG0E30DZRlCT0no='
          alt=''
        />
        <div>Your drink will be shipped soon</div>
        <Link to='/home'>
          <button className='checkout-button'>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    state: state,
  };
};

export default connect(mapState)(Checkout);
