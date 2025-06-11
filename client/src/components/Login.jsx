import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(AppContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async e => {
    e.preventDefault()
    const result = await login(email, password)
    toast(result.data.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    setTimeout(() => {
      navigate('/')
    }, 100)

    // console.log(result)
  }

  return (
    <main className='container d-flex justify-content-center align-items-center min-vh-100'>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
      <div className='card shadow p-4 w-100' style={{ maxWidth: '500px' }}>
        <h2 className='text-center mb-4'>Login</h2>
        <form onSubmit={loginHandler}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter your password'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Sign In
          </button>
        </form>

        {/* Forgot password */}
        <p className='text-center mt-3 mb-1'>
          <a href='#' className='text-decoration-none'>
            Forgot Password?
          </a>
        </p>

        {/* Sign Up prompt */}
        <p className='text-center mb-0'>
          Don’t have an account?{' '}
          <a href='#' className='text-decoration-none fw-semibold'>
            Sign Up
          </a>
        </p>
      </div>
    </main>
  )
}

export default Login
