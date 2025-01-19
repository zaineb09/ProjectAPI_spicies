import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reserveId, setReserveId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8070/users/', {
        username,
        password,
        reserve_id: reserveId,
      });
      navigate('/welcome');
    } catch (err) {
      setError('There was an error creating the user.');
      console.error(err);
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form">
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reserveId">Reserve ID</label>
            <input
              type="number"
              id="reserveId"
              value={reserveId}
              onChange={(e) => setReserveId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create User</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      {/* Animated Leaves */}
      <div className="leaf"></div>
      <div className="leaf"></div>
      <div className="leaf"></div>
    </div>
  );
};

export default CreateUser;
