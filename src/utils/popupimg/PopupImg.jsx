import React from 'react';
import './PopupImg.css';
const PopupImg = (props) => (
  <div className="popupImg">
    <div className="popup_innerImg">
      <span className="close-popupImg" onClick={() => props.openHidePopup()}>
        X
      </span>
      {props.children}
    </div>
  </div>
);

export default PopupImg;
