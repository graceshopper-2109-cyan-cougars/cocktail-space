import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../store/signup';
import { authenticate } from '../store';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.newUser({ ...this.state });
    await this.props.login({ ...this.state });
  }

  render() {
    const { firstName, lastName, username, password } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className='signup'>
        <div className='signup__container'>
          <h1>Sign-Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={handleChange}
              value={firstName}
            />

            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={handleChange}
              value={lastName}
            />

            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='username'
              onChange={handleChange}
              value={username}
            />

            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              value={password}
            />

            <button
              type='submit'
              // onClick={displayName}
              className='signup__signInButton'
            >
              Sign Up
            </button>
            {/* {error && error.response && <div> {error.response.data} </div>} */}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newUser: (user) => dispatch(signUp(user)),
  login: (user) =>
    dispatch(authenticate(user.username, user.password, 'login')),
});

export default connect(null, mapDispatchToProps)(SignUp);
