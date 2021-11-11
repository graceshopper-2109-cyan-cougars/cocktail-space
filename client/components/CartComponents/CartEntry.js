import React from "react";

class CartEntry extends React.Component {
  handleClick() {}

  render() {
    return (
      <div className="cart-entry-container">
        <img src={this.props.imageUrl} width="100" height="100" />
        <div> {this.props.name}</div>
        <label for="cart-qty">Qty: </label>
        <input type="number" id="qty" name="cart-qty" />
        <button type="button" onclick={this.handleClick}>
          X
        </button>
        <div id="cart-entry-price">{this.props.price}</div>
      </div>
    );
  }
}

export default CartEntry;
