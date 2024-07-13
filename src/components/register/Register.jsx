import React, { useState, useEffect } from 'react';
import "./Register.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from '@mui/icons-material/Close';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '../../cognitoConfig';
import { useAlert } from '../errAlert/AlertContext';

const Register = ({onClose,onClickShift}) => {
  const [showCodeDiv, setShowCodeDiv] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = useAlert();
  const userPool = new CognitoUserPool(poolData);

  const handleSignUpWithEmail = () => {
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        //alert(err.message || JSON.stringify(err));
        showAlert(err.message, 'error'/*, 40000*/);
        return;
      } else {
        showAlert('Verify Your Account', 'info'/*, 40000*/);
        setShowCodeDiv(true);
      }
    });
  };
  const handleConfirm = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    //console.log(cognitoUser);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        //alert(err.message || JSON.stringify(err));
        showAlert(err.message, 'error'/*, 40000*/);
        return;
      }
      showAlert('SignUp Completed', 'success'/*, 40000*/);
      onClickShift(); // Redirect to login
    });
  };
    

  const handleResendCode = () => {
      const userData = {
        Username: email,
        Pool: userPool,
      };
  
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          //alert(err.message || JSON.stringify(err));
          showAlert(err.message, 'error'/*, 40000*/);
          return;
        }
        //alert('Verification code resent successfully');
        showAlert('Verification code resent', 'info'/*, 40000*/);
      });
  };

  return (
    <div className='register'>
      <div className="container">
        <div className="close-btn" onClick={onClose}>
          <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }}/></i>
        </div>
        {!showCodeDiv ? (
          <div className='field-div'>
            <div className="heading">
              <p>Sign up to take your trip planning to the next level</p>
            </div>
            <div className="sign-up-google">
              <img src={googleLogo} alt="Google Logo" />
              <span>Sign up with Google</span>
            </div>
            <div className="or">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <div className="email">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-up-btn" onClick={handleSignUpWithEmail}>
              <span>Sign up with email</span>
            </div>
            <div className="log-in">
              <span>Already have an account? <b onClick={onClickShift}>Log in</b></span>
            </div>
          </div>
        ) : (
          <div className='code-div'>
            <div className="heading">
              <p>Enter verification code</p>
            </div>
            <div className="verification-code">
              <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="confirm-btn" onClick={handleConfirm}>
              <span>Confirm</span>
            </div>
            <div className="resend-code">
              <p>Don't receive code? <b onClick={handleResendCode}>Send again</b></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register