import './Login.css'
import loginImage from '../assets/images/login_logo.jpg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormError from '../components/common/FormError.jsx'
import { getAuthFormError, validateEmailPassword } from '../utils/authForm.js'

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const validationError = validateEmailPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (validationError) {
      setError(getAuthFormError(validationError))
      return
    }

    setError('')
    navigate('/home')
  }

  return (
    <main className="login-page">
      <section className="login-main" aria-label="Sign in">
        <div className="login-visual" style={{ backgroundImage: `url(${loginImage})` }}>
          <div className="login-visual__copy">
            <h1>A small car.<br />A big obsession.</h1>
            <p>WELCOME TO THE COLLECTOR’S GARAGE</p>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-form-wrap">
            <h2>Welcome back.</h2>
            <p className="login-intro">Sign in to your collector account.</p>

            <form className="login-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="login-email">Email address</label>
              <input id="login-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />

              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <FormError message={error} />
              <button className="login-submit" type="submit">Sign in</button>
            </form>

            <p className="login-signup">New here? <Link to="/register">Create an account</Link></p>
            <button className="login-google" type="button">Continue with Google</button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Login
