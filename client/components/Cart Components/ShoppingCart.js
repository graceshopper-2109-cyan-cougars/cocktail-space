import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

class ShoppingCart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { loggedIn, loadCart } = this.props;
    loadCart(loggedIn);
  }

  render() {
    return (
      <div className='shopping-cart-container'>
        Your Shopping Cart
        <div> </div>
      </div>
    );
  }
}

const mapState = ({ auth, cart }) => ({
  loggedIn: !!auth.id,
  cart: cart,
});

const mapDispatch = (dispatch) => {
  return {
    loadCart: (loggedIn) => dispatch(fetchCart(loggedIn)),
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
