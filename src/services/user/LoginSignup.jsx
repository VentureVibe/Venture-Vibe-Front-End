import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { poolData } from "../../cognitoConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const userPool = new CognitoUserPool(poolData);

const getCognitoUser = (email) =>
  new CognitoUser({
    Username: email,
    Pool: userPool,
  });

const handleCallback = (onSuccess, onFailure) => ({
  onSuccess,
  onFailure,
});

export const signUpWithEmail = (email, password, onSuccess, onFailure) => {
  userPool.signUp(email, password, [], null, (err, result) => {
    if (err) {
      onFailure(err.message);
      return;
    }
    const userSub = result.userSub;
    //console.log(userSub);
    onSuccess("Verify Your Account", userSub);
  });
};

export const addUserWithEmail = (email, userSub, onSuccess, onFailure) => {
  axios
    .post("http://localhost:8080/api/v1/public/traveler", {
      id: userSub,
      email: email,
    })
    .then((response) => {
      onSuccess("User added successfully");
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      onFailure(errorMessage);
    });
};

export const handleUserRegistration = (
  email,
  password,
  onSuccess,
  onFailure
) => {
  signUpWithEmail(
    email,
    password,
    (message, userSub) => {
      // If sign up is successful, add the user to the application database
      addUserWithEmail(
        email,
        userSub,
        (dbMessage) => {
          onSuccess(`${message}. ${dbMessage}`);
        },
        (dbError) => {
          onFailure(`Sign-up successful, but error adding user: ${dbError}`);
        }
      );
    },
    (error) => {
      // Handle sign-up error
      onFailure(error);
    }
  );
};

export const confirmRegistration = (
  email,
  verificationCode,
  onSuccess,
  onFailure
) => {
  const cognitoUser = getCognitoUser(email);

  cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
    if (err) {
      onFailure(err.message);
      return;
    }
    onSuccess("SignUp Completed");
  });
};

export const resendConfirmationCode = (email, onSuccess, onFailure) => {
  const cognitoUser = getCognitoUser(email);

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      onFailure(err.message);
      return;
    }
    onSuccess("Verification code resent");
  });
};

export const loginUser = (email, password, onSuccess, onFailure) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const cognitoUser = getCognitoUser(email);

  cognitoUser.authenticateUser(
    authenticationDetails,
    handleCallback(onSuccess, onFailure)
  );
};

export const sendForgotPasswordCode = (email, onSuccess, onFailure) => {
  const cognitoUser = getCognitoUser(email);
  cognitoUser.forgotPassword(handleCallback(onSuccess, onFailure));
};

export const changePassword = (
  email,
  code,
  newPassword,
  onSuccess,
  onFailure
) => {
  const cognitoUser = getCognitoUser(email);
  cognitoUser.confirmPassword(
    code,
    newPassword,
    handleCallback(onSuccess, onFailure)
  );
};

export const handleGoogleSignIn = () => {
  const url =
    "https://venture.auth.eu-north-1.amazoncognito.com/oauth2/authorize";
  // "https://venturevibe24.auth.eu-north-1.amazoncognito.com/oauth2/authorize";
  const currentUrl = window.location.href;
  const params = new URLSearchParams({
    identity_provider: "Google",
    redirect_uri: "http://localhost:5173",
    response_type: "CODE",
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: "email openid profile",
    state: encodeURIComponent(currentUrl), // Add current URL as state
  });

  window.location.href = `${url}?${params.toString()}`;
};

export const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");

  const url =
    // "https://venturevibe24.auth.eu-north-1.amazoncognito.com/logout"
    "https://venture.auth.eu-north-1.amazoncognito.com/logout";
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_CLIENT_ID,
    logout_uri: "http://localhost:5173",
  });

  window.location.href = `${url}?${params.toString()}`;
};

export const exchangeCodeForTokens = async (code, state) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("redirect_uri", "http://localhost:5173");
  params.append("code", code);

  try {
    // Make POST request using Axios
    const response = await axios.post(
      // "https://venturevibe24.auth.eu-north-1.amazoncognito.com/oauth2/token"
      "https://venture.auth.eu-north-1.amazoncognito.com/oauth2/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Extract tokens from response data
    const { access_token, id_token, refresh_token } = response.data;

    // Store tokens in localStorage
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("idToken", id_token);
    localStorage.setItem("refreshToken", refresh_token);

    // Decode the ID token to extract user email and userSub
    const decodedToken = jwtDecode(id_token);
    const email = decodedToken.email;
    const userSub = decodedToken.sub;

    // Add user email to the database
    await addUserWithEmail(
      email,
      userSub,
      (successMessage) => {
        // Handle success scenario
        localStorage.setItem("successok", true);

        // Redirect and clear URL parameters
        window.history.replaceState(
          {},
          document.title,
          state ? decodeURIComponent(state) : "/"
        );
        window.location.reload();
      },
      (errorMessage) => {
        // Handle failure scenario
        console.error("Error adding user:", errorMessage);
      }
    );
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
  }
};
