import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import { useAuth } from '../Context/AuthContextProvider'

function LoginForm() {
  const [user, setUser] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', user)
      const { token, userData } = res.data

      login(token, userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      alert('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md  bg-gradient-to-t to-amber-300 rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700   text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
