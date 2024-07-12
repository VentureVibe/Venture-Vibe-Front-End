import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { poolData } from '../../cognitoConfig';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
//import ErrAlert from '../errAlert/errAlert';
import { useAlert } from '../errAlert/AlertContext';

// const Login = ({ onClose ,onClickShift}) => {
//   return (
//     <div className='login'>
//       <div className="container">
//         <div className="close-btn" onClick={onClose}>
//           <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
//         </div>
//         <div className="heading">
//           <span>Login to Venture Vibe</span>
//         </div>
//         <div className="sign-up-google">
//           <img src={googleLogo} alt="Google Logo" />
//           <span>Log in with Google</span>
//         </div>
//         <div className="or">
//           <hr />
//           <span>or</span>
//           <hr />
//         </div>
//         <div className="email">
//           <input type="text" placeholder="Email" />
//         </div>
//         <div className="password">
//           <input type="password" placeholder="Password" />
//         </div>
//         <div className="forgot-password">
//           <span>Forgot password</span>
//         </div>
//         <div className="sign-up-btn">
//           <span>Log In</span>
//         </div>
//         <div className="log-in">
//           <span>Don't have an account yet? <b onClick={onClickShift}> Sign up</b></span>
//         </div>
//       </div>
//     </div>
//   );
// }

const Login = ({ onClose ,onClickShift}) => {
  const userPool = new CognitoUserPool(poolData);

  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const showAlert = useAlert(); 

  const handleLogin = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('Login successful:', result);
        setLoginSuccess(true);
        onClose();
        showAlert('Login successful', 'success', 4000);
        //<ErrAlert message={"hai"} duration={20000} />;
        //navigate('/');
        // Handle successful login (e.g., store tokens, redirect, etc.)
      },
      onFailure: (err) => {
        setLoginSuccess(false);
        if (err.code === 'UserNotConfirmedException') {
          setView('codeDiv');
          cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
              alert(err.message || JSON.stringify(err));
              return;
            }
            alert('Verification code resent successfully');
          });
          //localStorage.setItem('unconfirmedEmail', email);
        }
        else {
          console.error('Login failed:', err);
        }
      },
    });
  };

  const handleForgotPassword = () => {
    setView('enterEmail');
  };

  const handleSendCode = () => {
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        console.log('Code sent successfully:', data);
        setView('enterCode');
      },
      onFailure: function (err) {
        console.error('Error in sending code:', err);
      }
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: function () {
        console.log('Password changed successfully');
        setView('login');
      },
      onFailure: function (err) {
        console.error('Error in changing password:', err);
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
        alert(err.message || JSON.stringify(err));
        return;
      }
      //alert('Signup confirmed! Redirecting to login.');
      //cognitoUser = null;
      //setCognitoUser(null);
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
          alert(err.message || JSON.stringify(err));
          return;
        }
        alert('Verification code resent successfully');
      });
  };


  return (
    <div className='login'>
      <div className="container">
        
        {view === 'login' && (
          <div className='login-div'>
            <div className="close-btn" onClick={onClose}>
              <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="heading">
              <span>Login to Venture Vibe</span>
            </div>
            <div className="sign-up-google">
              <img src={googleLogo} alt="Google Logo" />
              <span>Log in with Google</span>
            </div>
            <div className="or">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <div className="email">
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="password">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="forgot-password" onClick={handleForgotPassword}>
              <span>Forgot password</span>
            </div>
            <div className="sign-up-btn" onClick={handleLogin}>
              <span>Log In</span>
            </div>
            <div className="log-in">
              <span>Don't have an account yet? <b onClick={onClickShift}> Sign up</b></span>
            </div>
          </div>
        )}
        {view === 'enterEmail' && (
          <div className='email-div'>
            <div className='btns'>
            <div className="back-btn" onClick={() => setView('login')}>
              <i><ArrowBackIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="close-btn" onClick={onClose}>
              <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            </div>
            {/* <div className="back-btn" onClick={() => setView('login')}>
              <i><ArrowBackIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div> */}
            <div className="heading">
              <span>Enter email to change password</span>
            </div>
            <div className="email">
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="send-code-btn" onClick={handleSendCode}>
              <span>Send confirmation code to email</span>
            </div>
          </div>
        )}
        {view === 'enterCode' && (
          <div className='code-div'>
            <div className='btns'>
            <div className="back-btn" onClick={() => setView('login')}>
              <i><ArrowBackIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="close-btn" onClick={onClose}>
              <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            </div>
            {/* <div className="back-btn" onClick={() => setView('login')}>
              <i><ArrowBackIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div> */}
            <div className="heading">
              <span>Enter verification code</span>
            </div>
            <div className="verification-code">
              <input type="text" placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className="new-password">
              <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="confirm-new-password">
              <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <div className="confirm-btn" onClick={handleChangePassword}>
              <span>Change Password</span>
            </div>
          </div>
        )}
        {view === 'codeDiv' && (
          <div className='code-div'>
          <div className="heading">
            <p>Enter verification code</p>
          </div>
          <div className="verification-code">
            {/* <input type="text" placeholder="Verification Code" /> */}
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
        {/* {loginSuccess && (
        <ErrAlert message={"hai"} duration={2000} />
      )} */}
      </div>
    </div>
  );
}

export default Login;
