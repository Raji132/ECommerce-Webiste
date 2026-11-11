import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import loginImage from '../assets/images/login_logo.jpg'
import FormError from '../components/common/FormError.jsx'
import { getAuthFormError, validateEmail } from '../utils/authForm.js'
import './Login.css'

function ForgotPassword() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    const validationError = validateEmail(email)
    if (validationError) {
      setError(getAuthFormError(validationError))
      return
    }
    navigate(`/verify-code?email=${encodeURIComponent(email)}`)
  }

  return (
    <main className="login-page">
      <section className="login-main" aria-label="Forgot your password">
        <div className="login-visual" style={{ backgroundImage: `url(${loginImage})` }}>
          <div className="login-visual__copy">
            <h1>A small car.<br />A big obsession.</h1>
            <p>WELCOME TO THE COLLECTOR&apos;S GARAGE</p>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-form-wrap">
            <h2>Forgot your password?</h2>
            <p className="login-intro">No worries. We&apos;ll send you a verification code.</p>

            <form className="login-form recovery-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="recovery-email">Email address</label>
              <input id="recovery-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              <FormError message={error} />
              <button className="login-submit" type="submit">Send verification code</button>
            </form>

            <Link className="auth-back-link" to="/login">← Back to sign in</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ForgotPassword
