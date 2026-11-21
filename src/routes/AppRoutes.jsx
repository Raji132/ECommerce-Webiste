import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loader from '../components/common/Loader.jsx'
import MainLayout from '../layouts/MainLayout.jsx'

const ForProfessionals = lazy(
  () => import('../pages/ForProfessionals/ForProfessionals.jsx')
)
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.jsx'))
const Home = lazy(() => import('../pages/Home/Home.jsx'))
const HowItWorks = lazy(() => import('../pages/HowItWorks/HowItWorks.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const AccountLayout = lazy(() => import('../pages/MyAccount/AccountLayout.jsx'))
const AccountDashboard = lazy(() => import('../pages/MyAccount/AccountDashboard.jsx'))
const AddressBook = lazy(() => import('../pages/MyAccount/AddressBook.jsx'))
const Profile = lazy(() => import('../pages/MyAccount/Profile.jsx'))
const MyOrders = lazy(() => import('../pages/MyAccount/MyOrders.jsx'))
const OrderDetails = lazy(() => import('../pages/MyAccount/OrderDetails.jsx'))
const OrderInvoice = lazy(() => import('../pages/MyAccount/OrderInvoice.jsx'))
const OrderTracking = lazy(() => import('../pages/MyAccount/OrderTracking.jsx'))
const AccountPlaceholder = lazy(() => import('../pages/MyAccount/AccountPlaceholder.jsx'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'))
const Register = lazy(() => import('../pages/Register.jsx'))
const ResetPassword = lazy(() => import('../pages/ResetPassword.jsx'))
const Services = lazy(() => import('../pages/Services/Services.jsx'))
const VerifyCode = lazy(() => import('../pages/VerifyCode.jsx'))

function AppRoutes() {
  const { t } = useTranslation()

  return (
    <Suspense fallback={<Loader fullPage label={t('loading')} />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-code" element={<VerifyCode />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="for-professionals" element={<ForProfessionals />} />
          <Route path="my-account" element={<AccountLayout />}>
            <Route index element={<AccountDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/track" element={<OrderTracking />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="orders/:orderId/invoice" element={<OrderInvoice />} />
            <Route path="wishlist" element={<AccountPlaceholder title="Wishlist" />} />
            <Route path="addresses" element={<AddressBook />} />
            <Route path="payment-methods" element={<AccountPlaceholder title="Payment Methods" />} />
            <Route path="notifications" element={<AccountPlaceholder title="Notifications" />} />
            <Route path="support" element={<AccountPlaceholder title="Support" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
