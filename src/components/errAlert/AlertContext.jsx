import React, { createContext, useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import './alert.scss';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', severity: '', visible: false });

  const showAlert = (message, severity = 'error'/*, duration = 2000*/) => {
    setAlert({ message, severity, visible: true });
    setTimeout(() => {
      setAlert({ message: '', severity: '', visible: false });
    }, 10000);
  };

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'success':
        return {
          bgcolor: /*'#c3f3d7'*/'rgba(255, 255, 255, 0.9)',
          color: '#23ad5c',
          borderLeft: '5px solid #2ed573',
        };
      case 'error':
        return {
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: '#ff4757',
          borderLeft: '5px solid #ff4757',
        };
      case 'info':
        return {
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: '#3eb6ff',
          borderLeft: '5px solid #71c9ff',
        };
      case 'warning':
        return {
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: '#ce8500',
          borderLeft: '5px solid #ffa502',
        };
      // default:
      //   return {
      //     bgcolor: 'white',
      //     color: 'green',
      //     border: '1px solid green',
      //   };
    }
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert.visible && (
        <Alert variant="filled" severity={alert.severity} className='err' sx={{...getAlertStyles(alert.severity), padding: '2px 10px'}}>
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};
