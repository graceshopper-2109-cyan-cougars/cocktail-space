import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 600);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h3 className="ageVerification">Age Verification</h3>
        <p className="disclaimer">
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
