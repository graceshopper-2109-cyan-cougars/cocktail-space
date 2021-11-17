import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartEntry from './CartEntry';
import { formatPrice } from '../../utility.js';
import { checkout, fetchCart } from '../../store/cart.js';
import history from '../../history.js';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(evt) {
    if (this.props.cart.length > 0) {
      let orderId = this.props.cart[0].orderId;
      let outOfStockItems = await this.props.checkout(this.props.loggedIn);
      if (outOfStockItems.length > 0) {
        let alertString = outOfStockItems.reduce((accum, item) => {
          return accum + ' ' + item.name;
        }, '');
        window.alert("We don't have enough" + alertString + ' :(');
      } else {
        history.push(`/checkout/${orderId}`);
      }
    } else {
      window.alert('Your cart is empty!');
    }
  }

  render() {
    const { cart, drinks } = this.props;

    let subtotal = 0;
    return drinks.length > 0 ? (
      <div className='shopping-cart-container'>
        <div id='cart-title-text'>Your Shopping Cart</div>
        <div className='cart-entry-list-container'>
          {cart.length == 0 ? (
            <div> Your cart is empty!</div>
          ) : (
            cart.map((item, index) => {
              const drink = drinks[item.drinkId - 1];
              subtotal += drinks[item.drinkId - 1].price * item.quantity;
              return (
                <CartEntry
                  key={item.id || index}
                  drink={drink}
                  cartItem={item}
                />
              );
            })
          )}
        </div>
        {cart.length == 0 ? (
          <div></div>
        ) : (
          <div className='order-price-details'>
            <div className='subtotal-text'>
              Subtotal: {formatPrice(subtotal * 100)}
            </div>
            <div className='shipping-text'>Shipping: $9.99</div>
            <hr />
            <div className='subtotal-text'>
              Total: {formatPrice((subtotal + 9.99) * 100)}
            </div>
          </div>
        )}
        <div className='cart-options'>
          <div>
            <Link to='/home' className='option'>
              Continue Shopping
            </Link>
          </div>
          <div>
            <button className='option' onClick={this.handleClick}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    drinks: state.drinks,
    loggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    checkout: (loggedIn) => dispatch(checkout(loggedIn)),
    fetchCart: (loggedIn) => dispatch(fetchCart(loggedIn)),
  };
};

export default connect(mapState, mapDispatch)(ShoppingCart);
