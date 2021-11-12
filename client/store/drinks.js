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
    default:
      return state;
  }
}
