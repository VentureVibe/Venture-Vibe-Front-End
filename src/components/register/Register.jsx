import React, { useState, useEffect } from 'react';
import "./Register.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from '@mui/icons-material/Close';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '../../cognitoConfig';

// const Register = ({onClose,onClickShift}) => {
//   return (
//     <div className='register'>
//       <div className="container">
//       <div className="close-btn" onClick={onClose}>
//           <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }}/></i>
//         </div>
//         <div className="heading">
//           <p>Sign up to take your trip planning
//           to next level</p>
//         </div>
//         <div className="sign-up-google">
//           <img src={googleLogo} alt="" />
//           <span>Sign up with Google</span>
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
//         <div className="sign-up-btn">
//           <span>Sign up with email</span>
//         </div>
//         <div className="log-in">
//           <span >Already have an account? <b onClick={onClickShift}> Log in</b></span>
//         </div>
//       </div>
//     </div>
//   )
// }


const Register = ({onClose,onClickShift}) => {
  const [showCodeDiv, setShowCodeDiv] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userPool = new CognitoUserPool(poolData);
  //const [cognitoUser, setCognitoUser] = useState(null); 
  //let cognitoUser = null;

  // useEffect(() => {
  //   // Cleanup function to delete unconfirmed user on component unmount or refresh
  //   return () => {
  //     if (cognitoUser) {
  //       alert(cognitoUser);
  //       cognitoUser.deleteUser((err, result) => {
  //         if (err) {
  //           console.error('Error deleting unconfirmed user:', err);
  //         } else {
  //           console.log('Deleted unconfirmed user successfully:', result);
  //         }
  //       });
  //     } else {
  //       alert(cognitoUser);
  //     }
  //   };
  // }, [cognitoUser]); 

  const handleSignUpWithEmail = () => {
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      } else {
        //cognitoUser = result.user;
        //console.log(cognitoUser);
        //setCognitoUser(result.user);
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
              {/* <input type="text" placeholder="Email" /> */}
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              {/* <input type="password" placeholder="Password" /> */}
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
      </div>
    </div>
  );
}

export default Register