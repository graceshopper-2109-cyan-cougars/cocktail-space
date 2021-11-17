import axios from 'axios';

const GET_DRINKS = 'GET_DRINKS';

export const fetchDrinks = (action) => {
  return {
    type: GET_DRINKS,
    drinksFromServer: action.payload,
  };
};

export const setDrinks = () => {
  return async (dispatch, getState) => {
    const { data } = await axios.get('/api/drinks');
    data.sort((a, b) => {
      let id1 = a.id,
        id2 = b.id;
      if (id1 < id2) return -1;
      if (id1 > id2) return 1;
      return 0;
    });
    dispatch(fetchDrinks({ payload: data }));
  };
};

export default function drinksReducer(state = [], action) {
  switch (action.type) {
    case GET_DRINKS:
      return action.drinksFromServer;
    default:
      return state;
  }
}
