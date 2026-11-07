import { useTranslation } from 'react-i18next'

function ForProfessionals() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.forProfessionals')}</h1>
    </main>
  )
}

export default ForProfessionals
