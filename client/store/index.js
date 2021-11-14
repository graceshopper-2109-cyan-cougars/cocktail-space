import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import singleDrink from './singledrinks';
import auth from './auth';
import cart from './cart';
import drinksReducer from './drinks';
import signUpReducer from './signup';

const reducer = combineReducers({ auth, drinks: drinksReducer, cart, signUp: signUpReducer, singleDrink });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
