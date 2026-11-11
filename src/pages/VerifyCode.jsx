import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import loginImage from '../assets/images/login_logo.jpg'
import FormError from '../components/common/FormError.jsx'
import { getAuthFormError, validateVerificationCode } from '../utils/authForm.js'
import './Login.css'

function VerifyCode() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get('email') || ''
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [secondsLeft, setSecondsLeft] = useState(30)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, navigate])

  useEffect(() => {
    if (secondsLeft === 0) return undefined
    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft])

  function handleDigitChange(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item))
    if (digit && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    event.preventDefault()
    setDigits(Array.from({ length: 6 }, (_, index) => pasted[index] || ''))
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateVerificationCode(digits)
    if (validationError) {
      setError(getAuthFormError(validationError))
      return
    }
    setError('')
    navigate(`/reset-password?email=${encodeURIComponent(email)}`)
  }

  function resendCode() {
    if (secondsLeft === 0) {
      setDigits(['', '', '', '', '', ''])
      setSecondsLeft(30)
      inputRefs.current[0]?.focus()
    }
  }

  const formattedTime = `00:${String(secondsLeft).padStart(2, '0')}`

  return (
    <main className="login-page">
      <section className="login-main" aria-label="Verify your email">
        <div className="login-visual" style={{ backgroundImage: `url(${loginImage})` }}>
          <div className="login-visual__copy">
            <h1>A small car.<br />A big obsession.</h1>
            <p>WELCOME TO THE COLLECTOR&apos;S GARAGE</p>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-form-wrap">
            <h2>Check your inbox.</h2>
            <p className="login-intro">Enter the 6-digit code sent to {email}.</p>

            <form className="code-form" noValidate onSubmit={handleSubmit}>
              <div
                className="code-inputs"
                role="group"
                aria-label="Six-digit verification code"
                onPaste={handlePaste}
                style={{
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                  gridTemplateRows: '1fr',
                  gridAutoFlow: 'column',
                  gap: 'clamp(6px, 1.2vw, 14px)',
                }}
              >
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => { inputRefs.current[index] = element }}
                    aria-label={`Verification digit ${index + 1}`}
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    inputMode="numeric"
                    maxLength={1}
                    pattern="[0-9]"
                    required
                    value={digit}
                    style={{
                      boxSizing: 'border-box',
                      width: '100%',
                      minWidth: 0,
                      height: 'clamp(42px, 6vh, 58px)',
                      padding: 0,
                      border: '1px solid transparent',
                      borderRadius: 6,
                      background: '#f4f5f5',
                      color: '#192126',
                      font: 'inherit',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                    onChange={(event) => handleDigitChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                  />
                ))}
              </div>
              <p className="resend-code">
                {secondsLeft > 0 ? (
                  <>Resend code in {formattedTime}</>
                ) : (
                  <button type="button" onClick={resendCode}>Resend code</button>
                )}
              </p>
              <FormError message={error} />
              <button className="login-submit" type="submit">Verify code</button>
            </form>

            <Link className="auth-back-link" to="/login">← Back to sign in</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default VerifyCode
