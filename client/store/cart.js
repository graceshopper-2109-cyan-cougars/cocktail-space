import Axios from 'axios';

// action types
const GET_CART = 'GET_CART';

// action creator
const getCart = (cart) => ({ type: GET_CART, cart });

//thunk creator
export const fetchCart = (loggedIn) => {
  return async (dispatch) => {
    try {
      let cart = [];
      if (loggedIn) {
        const token = localStorage.getItem('token');
        cart = await (
          await Axios.get('/api/order/', { headers: { token } })
        ).data;
      }
      dispatch(getCart(cart));
    } catch (e) {
      return 'something went wrong';
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
