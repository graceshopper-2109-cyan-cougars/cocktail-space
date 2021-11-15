import axios from "axios";

// Action Type
const GET_DRINKS = 'GET_DRINKS';
const CREATE_DRINK = 'CREATE_DRINK'
const DELETE_DRINK = 'DELETE_DRINK'


// Action Creator
export const fetchDrinks = (action) => {
  return {
    type: GET_DRINKS,
    drinksFromServer: action.payload
  }
};

// Thunk Action
export const setDrinks = () => {
  return async (dispatch, getState) => {
    const { data } = await axios.get('/api/drinks');
    dispatch(fetchDrinks({payload: data}))
  }
};

// Reducer
export default function drinksReducer(state=[], action){
  switch(action.type){
    case GET_DRINKS:
      return action.drinksFromServer;
    default:
      return state;
  }
}
