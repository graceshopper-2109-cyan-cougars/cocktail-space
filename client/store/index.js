import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
<<<<<<< HEAD
import drinks from './drinks'
import singledrink from './singledrinks'

const reducer = combineReducers({ auth, drinks, singledrink})
=======
import drinksReducer from './drinks'

const reducer = combineReducers({ auth, drinks: drinksReducer })
>>>>>>> ada904d8a1be9a89614389040fdfd49e63de48ef
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
