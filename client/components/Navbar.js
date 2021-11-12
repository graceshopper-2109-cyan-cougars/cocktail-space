import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, username, handleClick, cart }) => (
  //need cart state from redux to add items to cart icon
  <div className='header'>
    <Link to='/home'>
      <h1 className='storeName'>Coctail Space</h1>
    </Link>

    <div className='header__nav'>
      <Link to={!isLoggedIn && '/login'} style={{ textDecoration: 'none' }}>
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
            <span className='count'>{cart.length}</span>
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
