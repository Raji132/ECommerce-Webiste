import { Link } from 'react-router-dom'
import { useState } from 'react'
import loginImage from '../assets/images/login_logo.jpg'
import FormError from '../components/common/FormError.jsx'
import { getAuthFormError, validateRegistration } from '../utils/authForm.js'
import './Login.css'

function Register() {
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const validationError = validateRegistration({
      name: form.get('name'), email: form.get('email'), phone: form.get('phone'),
      password: form.get('password'), consent: form.get('consent'),
    })
    setError(getAuthFormError(validationError || 'Registration is not connected yet.'))
  }

  return (
    <main className="login-page register-page">
      <section className="login-main" aria-label="Create your account">
        <div className="login-visual" style={{ backgroundImage: `url(${loginImage})` }}>
          <div className="login-visual__copy">
            <h1>A small car.<br />A big obsession.</h1>
            <p>WELCOME TO THE COLLECTOR&apos;S GARAGE</p>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-form-wrap">
            <h2>Start your collection.</h2>
            <p className="login-intro">Join a community that gets your obsession.</p>

            <form className="login-form register-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="register-name">Full name</label>
              <input id="register-name" name="name" type="text" placeholder="Your full name" autoComplete="name" required />

              <label htmlFor="register-email">Email address</label>
              <input id="register-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

              <label htmlFor="register-phone">Phone number</label>
              <input id="register-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" required />

              <label htmlFor="register-password">Password</label>
              <input id="register-password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" minLength="8" required />

              <label className="register-consent">
                <input type="checkbox" name="consent" />
                <span>I agree to the <a href="#terms">terms</a> and <a href="#privacy">privacy policy</a>.</span>
              </label>

              <button className="login-submit" type="submit">Create account</button>
              <FormError message={error} />
            </form>

            <p className="login-signup">Already a collector? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register
