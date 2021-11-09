import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
// import './Login.css';

const Login = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://mpng.subpng.com/20180205/iye/kisspng-cocktail-bartender-bartender-transparent-background-5a7822fda316b8.508700921517822717668.jpg"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form onSubmit={handleSubmit} name={name}>
          <h5>E-mail</h5>
          <input type="text" name="username" />

          <h5>Password</h5>
          <input type="password" name="password" />

          <button
            type="submit"
            onClick={displayName}
            className="login__signInButton"
          >
            Sign In
          </button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>

        <p>
          By signing-in you agree to be 18 or Over. Otherwise, please go here:
          {/* <Link
            to={{
              pathname: 'https://pbskids.org/daniel/',
            }}
            target="_blank"
          /> */}
        </p>

        <button onClick={handleSubmit} className="login__registerButton">
          Create your Drinkify Account
          {/* Need newUserForm Component to fill out and history.push(/newUserForm) on click */}
        </button>
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Logged = connect(mapLogin, mapDispatch)(Login);
export const Signup = connect(mapSignup, mapDispatch)(Login);
