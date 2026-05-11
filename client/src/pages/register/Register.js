import './register.css';
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("/api/user/register", newUser)
      .then((res) => {
        if (res.status === 200) {
          history.push("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error || "Something went wrong");
        }
      });
  };

  return (
    <form className="form-container" onSubmit={createUser}>
      {error && <div className="error-message">{error}</div>}
      <input
        name="name"
        type="text"
        placeholder="name"
        onChange={handleInputs}
      />
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
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;
