import React, { useEffect } from 'react';

function Popup(props) {
  useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      props.setTrigger(true);
      localStorage.setItem('pop_status', 1);
    }
  }, []);

  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <button className='close-btn' onClick={() => props.setTrigger(false)}>
          YES
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Popup;
