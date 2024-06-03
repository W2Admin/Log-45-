import React, { useState, useEffect } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { LoginAuthAction } from "../Redux/Login/LoginAction";
import { connect } from "react-redux";

function Login({ login, loading, errors }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState({});
  const [error, setError] = useState(false);

  const handleNumber = (e) => {
    const value = e.target.value;
    setEmail(value);
    setLoginState({ ...loginState, email: value });
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setLoginState({ ...loginState, password: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(
        loginState,
        () => {
          navigate(`/dashboard`);
        },
        () => {
          setError(true);
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    setLoginState({ email, password });
  }, [email, password]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-dry">
      <form
        className="w-full max-w-md p-8 rounded-2xl bg-white flex-colo shadow-md"
        onSubmit={handleLogin}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain mb-6"
        />
        {error && (
          <div className="error-message mb-4">
            <p>{errors}</p>
          </div>
        )}
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input
            label="Email"
            type="email"
            color={true}
            placeholder="admin@gmail.com"
            value={email}
            onChange={handleNumber}
          />
          <Input
            label="Password"
            type="password"
            color={true}
            placeholder="*********"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          type="submit"
          loading={loading}
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state?.login?.error,
    loading: state?.login?.dataAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginState, history, setErrorHandler) => {
      dispatch(LoginAuthAction(loginState, history, setErrorHandler));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
