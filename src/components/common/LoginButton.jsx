import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Button.css'

function LoginButton({ className = '', onClick }) {
  const { t } = useTranslation()

  return (
    <Link className={`login-button ${className}`.trim()} to="/login" onClick={onClick}>
      {t('navigation.login')}
    </Link>
  )
}

export default LoginButton
