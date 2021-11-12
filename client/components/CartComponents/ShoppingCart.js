import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { cart } = this.props;

    let subtotal = 0;
    return (
      <div className='shopping-cart-container'>
        Your Shopping Cart
        <div className='cart-entry-container'>
          {/* {cart.map((item) => {
            // hook up state.drinks later
            const drink = this.state.drinks[item.drinkId];
            subtotal += this.state.drinks[item.drinkId].price * item.quantity;
            <CartEntry props={drink} />;
          })} */}
        </div>
        <div>Subtotal: ${subtotal}</div>
        <div>Shipping: $9.99</div>
        <hr />
        <div>Total: ${subtotal + 9.99}</div>
        <Link to='/home'>Continue Shopping</Link>
        <Link to='/checkout'>Proceed to Checkout</Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapState)(ShoppingCart);
