import React from 'react';
import './PopUpMain.scss';
import ReactDOM from 'react-dom';

const PopUpMain = ({ Component }) => {
  return ReactDOM.createPortal(
    <div className='PopUpMain'>
      {Component}
    </div>,
    document.getElementById('portal')
  );
};

export default PopUpMain;