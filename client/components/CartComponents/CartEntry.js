import React from 'react';
import { connect } from 'react-redux';
import { updateQty } from '../../store/cart.js';

class CartEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.cartItem.quantity,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    this.setState({
      quantity: this.state.quantity + 1,
    });
    this.props.updateQty(true, this.props.cartItem.id, this.state.quantity + 1);
  }
  handleRemove() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
      this.props.updateQty(
        true,
        this.props.cartItem.id,
        this.state.quantity - 1
      );
    }
  }
  handleClick() {}

  render() {
    const drink = this.props.drink;
    return (
      <div className='cart-entry-container'>
        <img src={drink.imageUrl} width='100' height='100' />
        <div> {drink.name}</div>
        <div className='cart-entry-quantity'>
          <div className='qty'>Qty: {this.state.quantity}</div>
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
        <div id='cart-entry-price'>{drink.price}</div>
        <button type='button' onClick={this.handleClick}>
          X
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateQty: (loggedIn, cartItemId, qty) =>
      dispatch(updateQty(true, cartItemId, qty)),
  };
};

export default connect(null, mapDispatch)(CartEntry);
