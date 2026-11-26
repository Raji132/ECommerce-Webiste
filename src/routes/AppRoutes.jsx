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
const PaymentMethods = lazy(() => import('../pages/MyAccount/PaymentMethods.jsx'))
const Support = lazy(() => import('../pages/MyAccount/Support.jsx'))
const Profile = lazy(() => import('../pages/MyAccount/Profile.jsx'))
const MyOrders = lazy(() => import('../pages/MyAccount/MyOrders.jsx'))
const OrderDetails = lazy(() => import('../pages/MyAccount/OrderDetails.jsx'))
const OrderInvoice = lazy(() => import('../pages/MyAccount/OrderInvoice.jsx'))
const OrderTracking = lazy(() => import('../pages/MyAccount/OrderTracking.jsx'))
const AccountPlaceholder = lazy(() => import('../pages/MyAccount/AccountPlaceholder.jsx'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'))
const Register = lazy(() => import('../pages/Register.jsx'))
const ResetPassword = lazy(() => import('../pages/ResetPassword.jsx'))
const ProductListing = lazy(() => import('../pages/ProductListing/ProductListing.jsx'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails.jsx'))
const SearchResults = lazy(() => import('../pages/SearchResults/SearchResults.jsx'))
const Wishlist = lazy(() => import('../pages/Wishlist/Wishlist.jsx'))
const Cart = lazy(() => import('../pages/Cart/Cart.jsx'))
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
          <Route path="product_listing" element={<ProductListing />} />
          <Route path="product-listing" element={<ProductListing />} />
          <Route path="product_details" element={<ProductDetails />} />
          <Route path="product_details/:id" element={<ProductDetails />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="search_results" element={<SearchResults />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="bag" element={<Cart />} />
          <Route path="add_to_cart" element={<Cart />} />
          <Route path="add-to-cart" element={<Cart />} />
          <Route path="shop" element={<ProductListing />} />
          <Route path="services" element={<ProductListing />} />
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
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="notifications" element={<AccountPlaceholder title="Notifications" />} />
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes