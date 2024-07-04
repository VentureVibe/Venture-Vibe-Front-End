import React from 'react'
import "./Login.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  return (
    <div className='login'>
      <div className="container">
        <div className="close-btn">
          <i><CloseIcon sx={{ color: '#747474', fontSize: 15 }}/></i>
        </div>
        <div className="heading">
          <span>Login to Venture Vibe</span>
        </div>
        <div className="sign-up-google">
          <img src={googleLogo} alt="" />
          <span>Log in with Google</span>
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
        <div className="forgot-password">
          <span>Forgot password</span>
        </div>
        <div className="sign-up-btn">
          <span>Log In</span>
        </div>
        <div className="log-in">
          <span>Don't have an account yet? <b> Sign up</b></span>
        </div>
      </div>
    </div>
  )
}

export default Login