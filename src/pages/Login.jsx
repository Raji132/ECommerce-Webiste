import { useTranslation } from 'react-i18next'

function Login() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.login')}</h1>
    </main>
  )
}

export default Login
