import React from 'react';
import { connect } from 'react-redux';
import { fetchingSingleDrink } from '../store/singledrinks';
import { addItem, updateQty } from '../store/cart.js';
import history from '../history';
import { formatPrice } from '../utility';

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
          <img className='detailsImage' src={`/${currentDrink.image}`}></img>

          <p className='SingleDrink_Name'>{currentDrink.name}</p>
          <div className='SingleDrink_Details'>
            <p>{currentDrink.baseLiquor}</p>
            <p>{formatPrice(currentDrink.price)}</p>
            <p>Alcohol Content: {currentDrink.alcoholContent}</p>
            <p>Current Stock: {currentDrink.stock}</p>
          </div>
          <div>
            <p className='SingleDrink_FullDesc'>{currentDrink.description}</p>
          </div>
          <div className='buttonsWrapper'>
            <button className='detailsButton' onClick={this.handleClick}>
              Add to cart
            </button>
            <button
              className='detailsButton'
              onClick={() => {
                history.push(`/home`);
              }}
            >
              Return To Homepage
            </button>
          </div>
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
