import React from 'react';
import { connect } from 'react-redux';
import { fetchingSingleDrink } from '../store/singledrinks';
import { addItem, updateQty } from '../store/cart.js';

export class SingleDrinkDetail extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getSingleDrink(id);
  }

  handleClick() {
    const alreadyExists = this.props.cart.find(
      (item) => item.drinkId == this.props.drinkFromRedux.id
    );
    if (alreadyExists) {
      this.props.updateQty(
        this.props.loggedIn,
        alreadyExists,
        alreadyExists.quantity + 1
      );
    } else {
      this.props.addToCart(this.props.drinkFromRedux, 1);
    }
  }

  render() {
    const currentDrink = this.props.drinkFromRedux;
    return (
      <div className='singleDrinkContainer'>
        <div className='detailsWrapper'>
          <img className='detailsImage' src={currentDrink.image}></img>
          <button className='detailsButton' onClick={this.handleClick}>
            Add to cart
          </button>

          <p>Drink: {currentDrink.name}</p>
          <p>Base: {currentDrink.baseLiquor}</p>
          <p>Price: {currentDrink.price}</p>
          <p>Alcohol Content: {currentDrink.alcoholContent}</p>
          <p>Current Stock: {currentDrink.stock}</p>
          <p>{currentDrink.description}</p>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    drinkFromRedux: state.singleDrink,
    cart: state.cart,
    loggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleDrink: (id) => {
      dispatch(fetchingSingleDrink(id));
    },
    addToCart: (drink, quantity) => {
      dispatch(addItem(drink, quantity));
    },
    updateQty: (loggedIn, cartItem, quantity) => {
      dispatch(updateQty(loggedIn, cartItem, quantity));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleDrinkDetail);
