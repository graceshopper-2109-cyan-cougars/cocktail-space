import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, username, handleClick }) => (
  //need cart state from redux to add items to cart icon
  <div className='header'>
    <Link to='/'>
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
      <Link to='/checkout' style={{ textDecoration: 'none' }}>
        <div className='header__optionCart'>
          <span className='header__optionLineTwo header__cartCount'>
            {/* <span className='count'>{cart?.length}</span> */} 0
          </span>
          {/* <ShoppingCartSharpIcon /> */}
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
