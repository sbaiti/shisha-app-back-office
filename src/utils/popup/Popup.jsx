import React from 'react';
import './Popup.css';
const PopUp = (props) => (
  <div className="popup">
    <div className="popup_inner">
      <span className="close-popup" onClick={() => props.openHidePopup()}>
        X
      </span>
      {props.children}
    </div>
  </div>
);

export default PopUp;
