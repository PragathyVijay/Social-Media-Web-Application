import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const validateAndRegister = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !fullName.trim() || !email.trim() || !dob.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    axios.post('http://localhost:3001/register', {
      username: username,
      password: password,
      fullName: fullName,
      email: email,
      dob: dob
    }).then(() => {
      console.log('Registration successful');
      navigate("/login");
    });
  }

  return (
    <div>
      <h1>REGISTRATION DETAILS</h1>
      <form onSubmit={validateAndRegister}>
        <label>Full Name</label><br />
        <input type="text" name="fullName" onChange={(e) => setFullName(e.target.value)} />
        <br />
        <label>Email</label><br />
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Date of Birth</label><br />
        <input type="date" name="dob" onChange={(e) => setDob(e.target.value)} />
        <br />
        <label>User Name</label><br />
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password</label><br />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Registration;
