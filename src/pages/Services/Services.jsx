import { useTranslation } from 'react-i18next'

function Services() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.services')}</h1>
    </main>
  )
}

export default Services
