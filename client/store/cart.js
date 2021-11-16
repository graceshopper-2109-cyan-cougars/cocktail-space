import Axios from 'axios';

// action types
const GET_CART = 'GET_CART';
const UPDATE_QTY = 'UPDATE_QTY';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM = 'ADD_ITEM';

// action creator
const getCart = (cart) => ({ type: GET_CART, cart });
const _updateQty = (cartItem) => ({ type: UPDATE_QTY, cartItem });
const _deleteItem = (cartItem) => ({ type: DELETE_ITEM, cartItem });
const _addItem = (itemToAdd) => ({ type: ADD_ITEM, itemToAdd });

//thunk creator
export const fetchCart = (loggedIn) => {
  return async (dispatch) => {
    try {
      let cart = [];
      if (loggedIn) {
        const token = localStorage.getItem('token');
        cart = (await Axios.get('/api/order/', { headers: { token } })).data;
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

export const updateQty = (loggedIn, cartItem, qty) => {
  return async (dispatch) => {
    try {
      if (loggedIn) {
        const updatedCartItem = await (
          await Axios.put(`/api/order/${cartItem.id}`, { qty })
        ).data;
        dispatch(_updateQty(updatedCartItem));
      } else {
        // const guestCart = JSON.parse(localStorage.getItem('cart'));
        // guestCart.push(cartItem);
        // localStorage.setItem('cart', guestCart);
      }
    } catch (e) {
      return 'something went wrong';
    }
  };
};

export const deleteItem = (loggedIn, cartItem) => {
  return async (dispatch) => {
    try {
      if (loggedIn) {
        await Axios.delete(`/api/order/${cartItem.id}`);
        dispatch(_deleteItem(cartItem));
      } else {
        // UNFINISHED FINISHED THIS ONCE ADD TO CART BUTTON IS ADDED
        // const guestCart = JSON.parse(localStorage.getItem('cart'));
      }
    } catch (e) {
      return 'something went wrong';
    }
  };
};

export const addItem = (drink, quantity) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', []);
        } else {
          localStorage.cart.push(
            JSON.stringify({ drinkId: drink.id, quantity })
          );
        }
        return;
      }

      const itemToAdd = (
        await Axios.post(
          '/api/order/',
          { drinkId: drink.id, quantity },
          { headers: { token } }
        )
      ).data;

      dispatch(_addItem(itemToAdd));
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
    case DELETE_ITEM:
      return state.filter((item) => item.id != action.cartItem.id);
    case ADD_ITEM:
      return [...state, action.itemToAdd];
    default:
      return state;
  }
}
