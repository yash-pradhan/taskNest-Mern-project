import React from 'react'
import { useAuth } from '../Context/AuthContextProvider'

function NavBar({ children }) {
  const { logout } = useAuth()

  return (
    <nav className="sticky top-1 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-700">{children}</h1>

      <button
        type="button"
        onClick={logout}
        className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:from-red-600 hover:to-red-800 transition duration-300"
      >
        Logout
      </button>
    </nav>
  )
}

export default NavBar
