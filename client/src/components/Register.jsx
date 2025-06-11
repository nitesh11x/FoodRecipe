import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const { register } = useContext(AppContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const registerHandler = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await register(name, email, password, phone)
      const message = result?.data?.message || ''

      if (message.toLowerCase().includes('already exists')) {
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce
        })
      } else {
        toast.success(message || 'Registered successfully!', {
          position: 'top-right',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce
        })
        setTimeout(() => navigate('/login'), 1000)
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='card shadow p-4 w-100' style={{ maxWidth: '500px' }}>
        <h2 className='text-center mb-4'>Register</h2>
        <form onSubmit={registerHandler}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Full Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              type='text'
              className='form-control'
              id='name'
              placeholder='Enter your full name'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
              Phone Number
            </label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type='tel'
              className='form-control'
              id='phone'
              placeholder='Enter your phone number'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              type='password'
              className='form-control'
              id='password'
              placeholder='Create a password'
            />
          </div>

          <button
            type='submit'
            className='btn btn-success w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className='text-center mt-3 mb-0'>
          Already have an account?{' '}
          <Link to='/login' className='text-decoration-none fw-semibold'>
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Register
