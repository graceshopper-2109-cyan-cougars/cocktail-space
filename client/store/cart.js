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

export const addItem = (drinkId, quantity) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', []);
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.push({ drinkId, quantity });
        localStorage.setItem('cart', cart);
      }
      // const created = await Axios.post(
      //   '/api/order/',
      //   { drinkId: drinkId, quantity },
      //   { headers: { token } }
      // ).data;
      // dispatch(_addItem(created));

      // let itemToAdd;
      // let cart = JSON.parse(localStorage.getItem('cart'));
      // let itemCheck;
      // cart.forEach((item) => {
      //   if (item.id == drink.id) {
      //     item.quantity++;
      //     itemCheck = true;
      //   }
      // });

      // if (loggedIn && !itemCheck) {
      //   const token = localStorage.getItem('token');
      //   itemToAdd = (
      //     await Axios.post(
      //       '/api/order/',
      //       { drinkId: drink.id, quantity: 1 },
      //       { headers: { token } }
      //     )
      //   ).data;
      //   dispatch(_addItem(itemToAdd));
      // } else if (loggedIn && itemCheck) {
      //   const token = localStorage.getItem('token');
      //   await Axios.put(`/api/${}`)
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
