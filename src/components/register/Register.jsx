import React from 'react';
import "./Register.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from '@mui/icons-material/Close';

const Register = ({onClose,onClickShift}) => {
  return (
    <div className='register'>
      <div className="container">
      <div className="close-btn" onClick={onClose}>
          <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }}/></i>
        </div>
        <div className="heading">
          <p>Sign up to take your trip planning
          to next level</p>
        </div>
        <div className="sign-up-google">
          <img src={googleLogo} alt="" />
          <span>Sign up with Google</span>
        </div>
        <div className="or">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div className="email">
          <input type="text" placeholder="Email" />
        </div>
        <div className="password">
          <input type="password" placeholder="Password" />
        </div>
        <div className="sign-up-btn">
          <span>Sign up with email</span>
        </div>
        <div className="log-in">
          <span >Already have an account? <b onClick={onClickShift}> Log in</b></span>
        </div>
      </div>
    </div>
  )
}

export default Register