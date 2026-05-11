import "./register.css";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function Login() {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleInputs = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("/api/user/login", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          login(res.data);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error || "Something went wrong");
        }
      });
  };

  return (
    <form className="form-container" onSubmit={submitLogin}>
      {error && <div className="error-message">{error}</div>}
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
      <button type="submit">login</button>
      <Link to="/register">Sign now</Link>
    </form>
  );
}

export default Login;
