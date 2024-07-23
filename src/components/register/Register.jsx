import React, { useState } from 'react';
import './Register.scss';
import googleLogo from '../../assets/google-logo.png';
import CloseIcon from '@mui/icons-material/Close';
import { signUpWithEmail, 
  confirmRegistration, 
  resendConfirmationCode, 
  handleGoogleSignIn, 
  handleLogout } from '../../services/user/LoginSignup';
import { useAlert } from '../../context/errAlert/AlertContext';

const Register = ({ onClose, onClickShift }) => {
  const [showCodeDiv, setShowCodeDiv] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = useAlert();

  const handleSignUpWithEmail = () => {
    signUpWithEmail(email, password,
      (message) => {
        showAlert(message, 'info');
        setShowCodeDiv(true);
      },
      (error) => showAlert(error, 'error')
    );
  };

  const handleConfirm = () => {
    confirmRegistration(email, verificationCode,
      (message) => {
        showAlert(message, 'success');
        onClickShift();
      },
      (error) => showAlert(error, 'error')
    );
  };

  const handleResendCode = () => {
    resendConfirmationCode(email,
      (message) => showAlert(message, 'info'),
      (error) => showAlert(error, 'error')
    );
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='close-btn' onClick={onClose}>
          <i>
            <CloseIcon sx={{ color: '#747474', fontSize: 16 }} />
          </i>
        </div>
        {!showCodeDiv ? (
          <div className='field-div'>
            <div className='heading'>
              <p>Sign up to take your trip planning to the next level</p>
            </div>
            <div className='sign-up-google' onClick={handleGoogleSignIn}>
              <img src={googleLogo} alt='Google Logo' />
              <span>Sign up with Google</span>
            </div>
            <div className='or'>
              <hr />
              <span>or</span>
              <hr />
            </div>
            <div className='email'>
              <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='password'>
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='sign-up-btn' onClick={handleSignUpWithEmail}>
              <span>Sign up with email</span>
            </div>
            <div className='log-in'>
              <span>
                Already have an account? <b onClick={onClickShift}>Log in</b>
              </span>
            </div>
          </div>
        ) : (
          <div className='code-div'>
            <div className='heading'>
              <p>Enter verification code</p>
            </div>
            <div className='verification-code'>
              <input type='text' placeholder='Verification Code' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>
            <div className='confirm-btn' onClick={handleConfirm}>
              <span>Confirm</span>
            </div>
            <div className='resend-code'>
              <p>
                Don't receive code? <b onClick={handleResendCode}>Send again</b>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
