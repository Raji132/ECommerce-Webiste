import AppRoutes from './routes/AppRoutes.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </WishlistProvider>
  )
}

export default App
