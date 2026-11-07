import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.notFound')}</h1>
      <Link to="/">{t('pages.returnHome')}</Link>
    </main>
  )
}

export default NotFound
