import React from "react";
import "./auth.css";
import AuthImage from "./Auth.png";

const apiUrl = process.env.REACT_APP_API_URL;
const AuthPage = ({ type }) => {
  const isSignUp = type === "signup";

  const googleAuth = () => {
    window.open(`${apiUrl}/auth/google`, "_self");
  };

  return (
    <div className="container auth-div d-flex justify-content-center align-items-center">
      <div className="row auth-container">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center auth-image">
          <img src={AuthImage} alt="SmartHire" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center auth-form p-4">
          <h2 className="mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>

          <button
            onClick={googleAuth}
            className="google-btn btn hero-btn w-100"
          >
            <i className="bi bi-google me-2"></i> Continue with Google
          </button>

          <p className="mt-3">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}
            <a
              href={isSignUp ? "/auth/signin" : "/auth/signup"}
              className="auth-link ms-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
