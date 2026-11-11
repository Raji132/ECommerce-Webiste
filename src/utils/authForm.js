const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmailPassword({ email, password }) {
  const normalizedEmail = String(email || '').trim()

  if (!normalizedEmail || !password) {
    return 'Enter your email address and password.'
  }

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validateEmail(email) {
  const normalizedEmail = String(email || '').trim()
  if (!normalizedEmail) return 'Enter your email address.'
  if (!EMAIL_PATTERN.test(normalizedEmail)) return 'Enter a valid email address.'
  return ''
}

export function validateRegistration({ name, email, phone, password, consent }) {
  if (!String(name || '').trim()) return 'Enter your full name.'
  const emailError = validateEmail(email)
  if (emailError) return emailError
  if (!String(phone || '').trim()) return 'Enter your phone number.'
  if (!password) return 'Enter a password.'
  if (String(password).length < 8) return 'Use at least 8 characters for your password.'
  if (!consent) return 'Please agree to the terms and privacy policy.'
  return ''
}

export function validateVerificationCode(digits) {
  return Array.isArray(digits) && digits.length === 6 && digits.every((digit) => /^\d$/.test(digit))
    ? ''
    : 'Enter the 6-digit verification code.'
}

export function validatePasswordReset({ password, confirmPassword }) {
  if (!password || !confirmPassword) return 'Enter and confirm your new password.'
  if (String(password).length < 8) return 'Use at least 8 characters for your password.'
  if (password !== confirmPassword) return 'Your passwords do not match.'
  return ''
}

export function getAuthFormError(error) {
  if (typeof error === 'string') return error
  if (error instanceof Error && error.message) return error.message
  return 'Something went wrong. Please try again.'
}
