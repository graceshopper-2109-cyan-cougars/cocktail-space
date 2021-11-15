//Import Modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { me } from './store';

//Import Components
import { Logged, Signup } from './components/Login';
import ShoppingCart from './components/CartComponents/ShoppingCart';
import Quiz from './components/Quiz';
import AllDrinks from './components/DrinkList';
import SignUp from './components/SignUp';
import SingleDrinkDetail from './components/SingleDrinkDetail';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {
          <Switch>
            <Route path='/' exact component={AllDrinks} />
            <Route path='/home' exact component={AllDrinks} />
            <Route exact path='/drinks' component={AllDrinks} />
            <Route path='/drinks/:id' component={SingleDrinkDetail} />
            <Route path='/login' component={Logged} />
            <Route path='/signup' component={SignUp} />
            <Route path='/cart' exact component={ShoppingCart} />
            <Route path='/quiz' component={Quiz} />
          </Switch>
        }
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
