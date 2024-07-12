import React, { createContext, useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import './errAlert.scss';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', severity: '', visible: false });

  const showAlert = (message, severity = 'error', duration = 2000) => {
    setAlert({ message, severity, visible: true });
    setTimeout(() => {
      setAlert({ message: '', severity: '', visible: false });
    }, duration);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert.visible && (
        <Alert variant="filled" severity={alert.severity} className='err' sx={{ bgcolor: 'white', color: 'green', border: '1px solid green',}}>
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};
