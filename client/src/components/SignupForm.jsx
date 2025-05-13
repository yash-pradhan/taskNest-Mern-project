import React, { useState } from 'react'
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  let [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', user);
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Try again later');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-green-400   p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Create Account</h2>

        <div>
          <label className="block text-gray-600 mb-1">Enter your name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter name"
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Enter email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Enter password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
