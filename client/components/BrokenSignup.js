import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link, useHistory } from 'react-router-dom';
// import './Login.css';

const Signup = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className='login'>
      <Link to='/'></Link>

      <div className='login__container'>
        <h1>Sign-up</h1>

        <form onSubmit={handleSubmit} name={name}>
          <h5>First Name</h5>
          <input type='text' name='firstName' />

          <h5>Last Name</h5>
          <input type='text' name='lastName' />

          <h5>E-mail</h5>
          <input type='text' name='username' />

          <h5>Password</h5>
          <input type='password' name='password' />

          <button
            type='submit'
            // onClick={displayName}
            className='login__signInButton'
          >
            Sign Up
          </button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>

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
