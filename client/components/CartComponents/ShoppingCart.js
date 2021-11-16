import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartEntry from './CartEntry';

class ShoppingCart extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { cart, drinks } = this.props;

    let subtotal = 0;
    return (
      <div className='shopping-cart-container'>
        <div id='cart-title-text'>Your Shopping Cart</div>
        <div className='cart-entry-list-container'>
          {cart.length == 0 ? (
            <div> Your cart is empty!</div>
          ) : (
            cart.map((item) => {
              const drink = drinks[item.drinkId - 1];
              subtotal += drinks[item.drinkId - 1].price * item.quantity;
              return <CartEntry key={item.id} drink={drink} cartItem={item} />;
            })
          )}
        </div>
        {cart.length == 0 ? (
          <div></div>
        ) : (
          <div className='order-price-details'>
            <div className='subtotal-text'>Subtotal: ${subtotal}</div>
            <div className='shipping-text'>Shipping: $9.99</div>
            <hr />
            <div className='subtotal-text'>Total: ${subtotal + 9.99}</div>
          </div>
        )}
        <div className='cart-options'>
          <div className='option'>
            <Link
              to='/home'
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Continue Shopping
            </Link>
          </div>
          <div className='option'>
            <Link
              to='/checkout'
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    drinks: state.drinks,
  };
};

export default connect(mapState)(ShoppingCart);
