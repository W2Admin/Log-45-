import React, { useState, useEffect } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import OrgRegistrationForm from "./OrgRegistrationForm";
import { LoginAuthAction } from "../Redux/Login/LoginAction";
import { connect } from "react-redux";

function Login({login, loading, errors}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState({})
  const [error, seterror] = useState(false)

  const handleNumber = (e) => {
    const value = e.target.value;
    setEmail(value);
    console.log(value)
    setLoginState({ ...loginState, ...{email:email} });
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    console.log(value)
    setLoginState({ ...loginState, ...{password:password} });
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        await login(loginState, ()=>{ 
            // fetchgetprofile()
            navigate(`/dashboard`)
        // setPending(true);
        }, ()=>{ 
            seterror(true)
            // setErrorHandler(error)
            // setPending(false);
        });
    }catch(error){
    }
  };
  useEffect(() => {
    setLoginState({ ...loginState, email, password });
  }, [email, password]);
  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form
        className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo"
        onSubmit={handleLogin}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain"
        />
          {error && (
            <div className="error-message">
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
            onChange={(e)=>{handleNumber(e)}}
            // onBlur={handleNumber}
          />
          <Input
            label="Password"
            type="password"
            color={true}
            placeholder="*********"
            value={password}
            onChange={(e)=>{handlePassword(e)}}
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
const mapStateToProps = state => {
  return{
      errors:state?.login?.error,
      loading: state?.login?.dataAdded,
  }
}

const mapDispatchToProps = dispatch => {
  return{
      login: (loginState, history, setErrorHandler) => {
          dispatch(LoginAuthAction(loginState, history, setErrorHandler));
      },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
