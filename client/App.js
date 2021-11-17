import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './components/Popup';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { fetchCart, mergeCarts } from './store/cart.js';
import { me } from './store/auth.js';
import { setDrinks } from './store/drinks';

const App = () => {
  const [timedPopup, setTimedPopup] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const popupModalValue = localStorage.getItem('popupModal');
    if (!popupModalValue) {
      const timer = setTimeout(() => {
        setTimedPopup(true);
        localStorage.setItem('popupModal', '1');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      await dispatch(setDrinks());
      await dispatch(me());
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    dispatch(fetchCart(!!currentUser.id));
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
