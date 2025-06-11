import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')  // redirect to home after logout
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          React Food Recipe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <Link to="/add" className="btn btn-light mx-1 my-1 px-3 text-dark">
                  Add
                </Link>
                <Link to="/profile" className="btn btn-success mx-1 my-1 px-3">
                  Profile
                </Link>
                <Link to="/saved" className="btn btn-info mx-1 my-1 px-3 text-dark">
                  Saved
                </Link>
                <button
                  className="btn btn-danger mx-1 my-1 px-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary mx-1 my-1 px-3">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-warning mx-1 my-1 px-3 text-dark"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
