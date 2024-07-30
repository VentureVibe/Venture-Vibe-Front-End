import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import googleLogo from "../../assets/google-logo.png";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAlert } from "../../context/errAlert/AlertContext";
import {
  loginUser,
  sendForgotPasswordCode,
  changePassword,
  confirmRegistration,
  resendConfirmationCode,
  handleGoogleSignIn,
} from "../../services/user/LoginSignup";
import Loading from "../loading/Loading";
import { GetUser } from "../../services/user/GetUser";

const Login = ({ onClose, onClickShift }) => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = useAlert();

  const handleLogin = () => {
    setLoading(true);
    loginUser(
      email,
      password,
      (result) => {
        setLoading(false);
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken.jwtToken);
        localStorage.setItem("idToken", result.idToken.jwtToken);
        localStorage.setItem("refreshToken", result.refreshToken.token);
        localStorage.setItem("successok", true);
        onClose();
        //showAlert('Login successful', 'success');
        window.location.reload();
      },
      (err) => {
        setLoading(false);
        if (err.code === "UserNotConfirmedException") {
          showAlert("User Not Confirmed", "warning");
          setView("codeDiv");
          resendConfirmationCode(
            email,
            () => showAlert("Verification code resent successfully", "info"),
            (err) => showAlert(err.message, "error")
          );
        } else {
          console.error("Login failed:", err);
          showAlert(err.message, "error");
        }
      }
    );
  };

  const handleForgotPassword = () => {
    setLoading(true);
    setView("enterEmail");
    setLoading(false);
  };

  const handleSendCode = () => {
    setLoading(true);
    sendForgotPasswordCode(
      email,
      () => {
        setLoading(false);
        showAlert("Code Sent", "info");
        setView("enterCode");
      },
      (err) => {
        setLoading(false);
        showAlert("Error in sending code", "error");
      }
    );
  };

  const handleChangePassword = () => {
    setLoading(true);
    if (newPassword !== confirmNewPassword) {
      setLoading(false);
      showAlert("Passwords do not match", "error");
      return;
    }
    changePassword(
      email,
      code,
      newPassword,
      () => {
        setLoading(false);
        showAlert("Password changed", "success");
        setView("login");
      },
      (err) => {
        setLoading(false);
        showAlert("Error in changing password", "error");
      }
    );
  };

  const handleConfirm = () => {
    setLoading(true);
    confirmRegistration(
      email,
      verificationCode,
      () => {
        setLoading(false);
        showAlert("Account Verified", "success");
        onClose();
      },
      (err) => {
        setLoading(false);
        showAlert(err.message, "error");
      }
    );
  };

  const handleResendCode = () => {
    setLoading(true);
    resendConfirmationCode(
      email,
      () => {
        setLoading(false);
        showAlert("Verification code resent", "info");
      },
      (err) => {
        setLoading(false);
        showAlert(err.message, "error");
      }
    );
  };

  const googleSignIn = () => {
    setLoading(true);
    handleGoogleSignIn();
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="container">
        {loading && <Loading />}
        {view === "login" && (
          <div className="login-div">
            <div className="close-btn" onClick={onClose}>
              <i>
                <CloseIcon sx={{ color: "#747474", fontSize: 16 }} />
              </i>
            </div>
            <div className="heading">
              <span>Login to Venture Vibe</span>
            </div>
            <div className="sign-up-google" onClick={googleSignIn}>
              <img src={googleLogo} alt="Google Logo" />
              <span>Log in with Google</span>
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
            <div className="forgot-password" onClick={handleForgotPassword}>
              <span>Forgot password</span>
            </div>
            <div className="sign-up-btn" onClick={handleLogin}>
              <span>Log In</span>
            </div>
            <div className="log-in">
              <span>
                Don't have an account yet?{" "}
                <b onClick={onClickShift}> Sign up</b>
              </span>
            </div>
          </div>
        )}
        {view === "enterEmail" && (
          <div className="email-div">
            <div className="btns">
              <div className="back-btn" onClick={() => setView("login")}>
                <i>
                  <ArrowBackIcon sx={{ color: "#747474", fontSize: 16 }} />
                </i>
              </div>
              <div className="close-btn" onClick={onClose}>
                <i>
                  <CloseIcon sx={{ color: "#747474", fontSize: 16 }} />
                </i>
              </div>
            </div>
            <div className="heading">
              <span>Enter email to change password</span>
            </div>
            <div className="email">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="send-code-btn" onClick={handleSendCode}>
              <span>Send confirmation code to email</span>
            </div>
          </div>
        )}
        {view === "enterCode" && (
          <div className="code-div">
            <div className="btns">
              <div className="back-btn" onClick={() => setView("login")}>
                <i>
                  <ArrowBackIcon sx={{ color: "#747474", fontSize: 16 }} />
                </i>
              </div>
              <div className="close-btn" onClick={onClose}>
                <i>
                  <CloseIcon sx={{ color: "#747474", fontSize: 16 }} />
                </i>
              </div>
            </div>
            <div className="heading">
              <span>Enter verification code</span>
            </div>
            <div className="verification-code">
              <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="new-password">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="confirm-new-password">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className="confirm-btn" onClick={handleChangePassword}>
              <span>Change Password</span>
            </div>
          </div>
        )}
        {view === "codeDiv" && (
          <div className="code-div">
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

export default Login;
