import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './components/Popup';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { fetchCart } from './store/cart.js';
import { me } from './store/auth.js';

const App = () => {
  const [timedPopup, setTimedPopup] = useState(false);
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => {
    return !!state.auth.id;
  });
  const currentUser = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 600);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(me());
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    dispatch(fetchCart(loggedIn));
  }, [currentUser]);

  return (
    <div>
      <Navbar />
      <Routes />
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h3 className='ageVerification'>Age Verification</h3>
        <p className='disclaimer'>
          By clicking enter, I certify that I am over the age of 21 and will
          comply with the above statement.
          <br />
          <br />
          <small>Always enjoy responsibily.</small>
        </p>
      </Popup>
    </div>
  );
};

export default App;
