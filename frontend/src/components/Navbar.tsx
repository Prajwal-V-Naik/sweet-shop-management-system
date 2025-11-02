import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="flex justify-between items-center bg-pink-100 px-6 py-3 shadow">
      <h1 className="text-2xl font-bold text-pink-700">🍭 Sweet Shop</h1>
      <div className="space-x-4">
        <Link className="text-gray-700 hover:text-pink-600" to="/dashboard">Dashboard</Link>
        {!token ? (
          <>
            <Link className="text-gray-700 hover:text-pink-600" to="/login">Login</Link>
            <Link className="text-gray-700 hover:text-pink-600" to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar