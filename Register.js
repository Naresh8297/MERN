import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('YOUR_BACKEND_REGISTER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Successful registration logic here (e.g., redirect to login page)
      console.log('Registration successful');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
