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
import Checkout from './components/CartComponents/Checkout.js';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
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
            <Route path='/checkout/:orderId' component={Checkout} />
            <Route path='/quiz' component={Quiz} />
          </Switch>
        }
      </div>
    );
  }
}

export default Routes;
