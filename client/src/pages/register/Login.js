import "./register.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");

  const handleInputs = (e) => {
    const inputs = { ...userLogin };
    inputs[e.target.name] = e.target.value;
    setUserLogin(inputs);
  };

  const isUserRegistered = (e) => {
    e.preventDefault();
    const checkLog = { ...userLogin };

    axios
      .post("/api/user/login", {
        email: checkLog.email,
        password: checkLog.password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("user have an a count");
          console.log(res.data);
          setToken(res.data);
        }
      });
  };

  console.log(token);
  return (
    <form className="form-container">
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleInputs}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputs}
      />
      <button onClick={isUserRegistered}>login</button>
      <Link to="/register">Sign now</Link>
    </form>
  );
}

export default Login;
