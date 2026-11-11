import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginImage from '../assets/images/login_logo.jpg'
import FormError from '../components/common/FormError.jsx'
import { getAuthFormError, validatePasswordReset } from '../utils/authForm.js'
import './Login.css'

function ResetPassword() {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    const validationError = validatePasswordReset({ password, confirmPassword })
    if (validationError) {
      setMessage(getAuthFormError(validationError))
      return
    }

    setMessage('Password reset is ready to connect to the account service.')
  }

  return (
    <main className="login-page">
      <section className="login-main" aria-label="Reset your password">
        <div className="login-visual" style={{ backgroundImage: `url(${loginImage})` }}>
          <div className="login-visual__copy">
            <h1>A small car.<br />A big obsession.</h1>
            <p>WELCOME TO THE COLLECTOR&apos;S GARAGE</p>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-form-wrap">
            <h2>A fresh start.</h2>
            <p className="login-intro">Choose a strong password for your account.</p>

            <form className="login-form recovery-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="new-password">New password</label>
              <input id="new-password" name="password" type="password" autoComplete="new-password" minLength="8" required />

              <label htmlFor="confirm-password">Confirm password</label>
              <input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required />

              <button className="login-submit" type="submit">Reset password</button>
              <FormError message={message} />
            </form>

            <Link className="auth-back-link" to="/login">← Back to sign in</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ResetPassword
