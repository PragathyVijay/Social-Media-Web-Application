import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    setLoginError(null);
  
    axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then(response => {
      const { message, userId } = response.data; 
      console.log("Login Message:", message);
      console.log("User ID:", userId);
      if (message === 'Login Successful') {
        navigate("/dashboard", { state: { userId: userId } }); 
      } else {
        setLoginError(message);
      }
    }).catch(error => {
      console.error(error.response.data);
  
      setLoginError("Invalid credentials. Please try again.");
      setUsername("");
      setPassword("");
    });
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
        <label>User Name</label><br />
        <input type="text" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password</label><br />
        <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
      {loginError && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setLoginError(null)}>&times;</span>
            <p>{loginError}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
