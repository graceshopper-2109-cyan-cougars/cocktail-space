import Axios from 'axios';
import history from '../history';

// action types
const GET_CART = 'GET_CART';
const UPDATE_QTY = 'UPDATE_QTY';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const CHECKOUT = 'CHECKOUT';

// action creator
const getCart = (cart) => ({ type: GET_CART, cart });
const _updateQty = (cartItem) => ({ type: UPDATE_QTY, cartItem });
const _deleteItem = (cartItem) => ({ type: DELETE_ITEM, cartItem });
const _addItem = (itemToAdd) => ({ type: ADD_ITEM, itemToAdd });
const _checkout = (cart) => ({ type: CHECKOUT, cart });

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
        let guestCart = JSON.parse(localStorage.getItem('cart'));
        let itemToUpdate = guestCart.find(
          (item) => item.drinkId == cartItem.drinkId
        );
        itemToUpdate.quantity = qty;
        localStorage.setItem('cart', JSON.stringify(guestCart));
        dispatch(_updateQty(itemToUpdate));
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
        let guestCart = JSON.parse(localStorage.getItem('cart'));
        let itemToRemove;
        guestCart = guestCart.filter((item) => {
          if (item.drinkId == cartItem.drinkId) {
            itemToRemove = item;
          }
          return item.drinkId != cartItem.drinkId;
        });
        localStorage.setItem('cart', JSON.stringify(guestCart));

        dispatch(_deleteItem(itemToRemove));
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
      let itemToAdd;

      if (!token) {
        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', []);
        } else {
          let guestCart = JSON.parse(localStorage.getItem('cart'));
          itemToAdd = {
            id: guestCart.length + 1,
            drinkId: drink.id,
            quantity,
          };
          guestCart.push(itemToAdd);
          localStorage.setItem('cart', JSON.stringify(guestCart));
        }
        return dispatch(_addItem(itemToAdd));
      }

      itemToAdd = (
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

export const checkout = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const cart = (
          await Axios.post('/api/order/checkout', null, { headers: { token } })
        ).data;
        history.push('/checkout');
        dispatch(_checkout(cart));
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
    case DELETE_ITEM:
      return state.filter((item) => item.id != action.cartItem.id);
    case ADD_ITEM:
      return [...state, action.itemToAdd];
    case CHECKOUT:
      return action.cart;
    default:
      return state;
  }
}
