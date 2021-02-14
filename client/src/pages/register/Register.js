import './register.css';
import axios from "axios";
import { useState } from "react";

function Register(props) {

  const { isLogged, setIsLogged } = props;
  console.log(isLogged);
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const inputs = { ...newUser };
    inputs[e.target.name] = e.target.value;
    setNewUser(inputs);
  };

  const createUser = (e) => {
    e.preventDefault();
    const userData = { ...newUser };

    axios
      .post("/api/user/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        
      })
      .then((res) => {
        console.log(res.status);
        if(res.status === 200) {
          console.log(res.data);
          setIsLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="form-container">
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
      <button onClick={createUser}>Register</button>
    </form>
  );
}

export default Register;
