import Axios from 'axios';

// action types
const SET_CART = 'GET_CART';

// action creator
const setCart = (cart) => ({type: GET_CART, cart})

//thunk creator
export const fetchCart = () => {
  return async(dispatch) => {
    try {
      const { data } = await Axios.get('/api/cart')
    }
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
