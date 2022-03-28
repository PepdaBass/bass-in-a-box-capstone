import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="login-div">
    <div className="container-fluid mw-100 text-center">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="label-div">
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label><br />
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        </div>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
          <div className="login-buttons">
            <Link to="/register"><button>Register</button></Link>
          </div>
          <div className="login-buttons">
            <button>Login!</button>
          </div>
            
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
