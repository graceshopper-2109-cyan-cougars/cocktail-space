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
    default:
      return state;
  }
}
