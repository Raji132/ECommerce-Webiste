import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()

  return (
    <main className="page-placeholder">
      <h1>{t('pages.home')}</h1>
    </main>
  )
}

export default Home
