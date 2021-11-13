import Axios from 'axios';

// action types
const GET_CART = 'GET_CART';
const UPDATE_QTY = 'UPDATE_QTY';

// action creator
const getCart = (cart) => ({ type: GET_CART, cart });
const _updateQty = (cartItem) => ({ type: UPDATE_QTY, cartItem });

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
      } else {
        localStorage.getItem('cart')
          ? (cart = JSON.parse(localStorage.getItem('cart')))
          : localStorage.setItem('cart', '[]');
      }
      dispatch(getCart(cart));
    } catch (e) {
      return 'something went wrong';
    }
  };
};

export const updateQty = (loggedIn, cartItemId, qty) => {
  return async (dispatch) => {
    try {
      if (loggedIn) {
        const token = localStorage.getItem('token');
        const updatedCartItem = await (
          await Axios.put(`/api/order/${cartItemId}`, { qty, token })
        ).data;
        dispatch(_updateQty(updatedCartItem));
      } else {
      }
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
    case UPDATE_QTY:
      return state.map((item) =>
        item.id == action.cartItem.id ? action.cartItem : item
      );
    default:
      return state;
  }
}
