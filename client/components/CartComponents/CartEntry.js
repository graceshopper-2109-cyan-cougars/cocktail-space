import React from 'react';
import { connect } from 'react-redux';
import auth from '../../store/auth.js';
import { updateQty, deleteItem } from '../../store/cart.js';

class CartEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleAdd() {
    this.props.updateQty(
      this.props.isLoggedIn,
      this.props.cartItem,
      this.props.cartItem.quantity + 1
    );
  }
  handleRemove() {
    if (this.props.cartItem.quantity > 1) {
      this.props.updateQty(
        this.props.isLoggedIn,
        this.props.cartItem,
        this.props.cartItem.quantity - 1
      );
    }
  }
  handleClick() {
    this.props.deleteItem(this.props.isLoggedIn, this.props.cartItem);
  }

  render() {
    const drink = this.props.drink;
    return (
      <div className='cart-entry-container'>
        <img src={drink.image} width='100' height='100' />
        <div> {drink.name}</div>
        <div className='cart-entry-quantity'>
          <div className='qty'>Qty: {this.props.cartItem.quantity}</div>
          <div className='buttons-container'>
            <button type='button' className='add' onClick={this.handleAdd}>
              +
            </button>
            <button
              type='button'
              className='remove'
              onClick={this.handleRemove}
            >
              -
            </button>
          </div>
        </div>
        <div id='cart-entry-price'>${drink.price}</div>
        <button
          className='remove-from-cart-button'
          type='button'
          onClick={this.handleClick}
        >
          X
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateQty: (loggedIn, cartItem, qty) =>
      dispatch(updateQty(loggedIn, cartItem, qty)),
    deleteItem: (loggedIn, cartItem) =>
      dispatch(deleteItem(loggedIn, cartItem)),
  };
};

export default connect(mapState, mapDispatch)(CartEntry);
