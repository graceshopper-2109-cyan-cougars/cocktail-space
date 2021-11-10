import React from "react";
import { connect } from "react-redux";

class ShoppingCart extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div className="shopping-cart-container"></div>;
  }
}

const mapState = () => {};

const mapDispatch = () => {};

export default connect(mapState, mapDispatch)(ShoppingCart);
