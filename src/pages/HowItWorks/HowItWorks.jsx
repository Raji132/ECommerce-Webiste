import { useTranslation } from 'react-i18next'

function HowItWorks() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.howItWorks')}</h1>
    </main>
  )
}

export default HowItWorks
