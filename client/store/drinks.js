<<<<<<< HEAD
import axios from 'axios'


//Action Type
const FETCH_DRINKS = 'FETCH_DRINKS'


//Action Creator
const fetchDrinks = (drinks) =>{
  return {
    type: fetchDrinks,
    drinks
  }
}

//Thunk Action Creator
export const fetchingDrinks = () => {
  return async (dispatch) => {
    const {data: drinks} = await axios.get('/api/drinks')
    dispatch(fetchDrinks(drinks))
  }
}


//Drinks Sub-reducer
export default function drinks(state = [], action) {
  switch (action.type) {
    case FETCH_DRINKS:
      return action.drinks
=======
import axios from "axios";

const GET_DRINKS = 'GET_DRINKS';

export const fetchDrinks = (action) => {
  return {
    type: GET_DRINKS,
    drinksFromServer: action.payload
  }
};

export const setDrinks = () => {
  return async (dispatch, getState) => {
    const { data } = await axios.get('/api/drinks');
    dispatch(fetchDrinks({payload: data}))
  }
};

export default function drinksReducer(state=[], action){
  switch(action.type){
    case GET_DRINKS:
      return action.drinksFromServer;
>>>>>>> ada904d8a1be9a89614389040fdfd49e63de48ef
    default:
      return state;
  }
}
