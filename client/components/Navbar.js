import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, username, handleClick, cart }) => {
  let cartSize = 0;
  if (isLoggedIn && cart) {
    cartSize = cart.reduce((accum, item) => accum + item.quantity, 0);
  } else if (!isLoggedIn && JSON.parse(localStorage.getItem('cart'))) {
    // JSON.parse(localStorage.getItem('cart')).reduce(
    //   (accum, item) => accum + item.quantity,
    //   0
    // );
    let localCart = JSON.parse(localStorage.getItem('cart'));
    localCart.forEach((item) => (cartSize += item.quantity));
  }
  return (
    //need cart state from redux to add items to cart icon
    <div className='header'>
      <Link to='/home'>
        <h1 className='storeName'>Cocktail Space</h1>
      </Link>

      <div className='header__nav'>
        <Link to={'/login'} style={{ textDecoration: 'none' }}>
          <div className='header__option' onClick={handleClick}>
            <span className='header__optionLineOne'>
              Hello, {!username ? 'Guest' : username}
            </span>
            <span className='header__optionLineTwo'>
              {username ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to='/quiz'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Drink Persona</span>
            <span className='header__optionLineTwo'>& Quiz </span>
          </div>
        </Link>
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <div className='header__optionCart'>
            <span className='header__optionLineTwo header__cartCount'>
              <span className='count'>{cartSize}</span>
            </span>
            <img
              className='cartImage'
              src='https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-shopping-cart-miscellaneous-kiranshastry-lineal-kiranshastry.png'
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
