import axios from 'axios';
import history from '../history';

//action type
const SIGN_UP = "SIGN_UP";

//action creator
const _signUp = (user) => {
  return {
    type: SIGN_UP,
    user
  }
}

//THUNK
export const signUp = (user) => {
  return async(dispatch) =>{
    const {data} = await axios.post("/auth/signup", user);
    dispatch(_signUp(data))
  }
}

export default function signUpReducer(state = [], action){
  switch (action.type) {
    case SIGN_UP:
      return [ ...state, action.user];
    default:
      return state;
  }
}



