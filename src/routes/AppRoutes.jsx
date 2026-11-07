import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../components/common/Loader.jsx'
import MainLayout from '../layouts/MainLayout.jsx'

const ForProfessionals = lazy(
  () => import('../pages/ForProfessionals/ForProfessionals.jsx')
)
const Home = lazy(() => import('../pages/Home/Home.jsx'))
const HowItWorks = lazy(() => import('../pages/HowItWorks/HowItWorks.jsx'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'))
const Services = lazy(() => import('../pages/Services/Services.jsx'))

function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading page..." />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="for-professionals" element={<ForProfessionals />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes