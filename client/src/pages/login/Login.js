import { useState } from 'react';
import './login.css';

function Login() {

    const [ user, setUser ] = useState({ username: '', password: '' });

    const handleInputs = e => {
        const inputs = {...user };
        inputs[ e.target.name ]= e.target.value;
        setUser(inputs);
    }

    const handleUser = e => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <form>
            <input
                name="username"
                type="text"
                placeholder="name"
                onChange={handleInputs}
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleInputs}
            />
            <button onClick={handleUser}>login</button>
        </form>
    )
}

export default Login;
