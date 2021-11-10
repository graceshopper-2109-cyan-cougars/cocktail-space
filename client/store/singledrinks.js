import axios from 'axios'

//Action Type
const FETCH_SINGLE_DRINK = 'FETCH_SINGLE_DRINK'

//Action Creator
const fetchSingleDrink = (drink) => {
  return {
    type: FETCH_SINGLE_DRINK,
    drink
  }
}

//Thunk Action Creator
export const fetchingSingleDrink = (id) => {
  return async (dispatch) => {
    const {data: drink} = await axios.get(`/api/drinks/${id}`)
    dispatch(fetchSingleDrink(drink))
  }
}

//Single-Drink Sub-reducer
export default function singleDrink(state = [], action) {
  switch(action.type) {
    case FETCH_SINGLE_DRINK:
      return action.drink
    default:
      return state
  }
}
