import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useAuth()

  const [cart, setCart] = useState(() => {
    if (!isLoggedIn || !user?.email) return []
    try {
      const saved = localStorage.getItem(`apex_cart_${user.email}`)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [couponCode, setCouponCode] = useState('FIRST10')
  const [discountPercent, setDiscountPercent] = useState(10)

  // Sync with logged-in user changes
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      try {
        const saved = localStorage.getItem(`apex_cart_${user.email}`)
        setCart(saved ? JSON.parse(saved) : [])
      } catch {
        setCart([])
      }
    } else {
      setCart([])
    }
  }, [isLoggedIn, user?.email])

  // Save cart changes for the logged-in user
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      try {
        localStorage.setItem(`apex_cart_${user.email}`, JSON.stringify(cart))
      } catch {
        // Storage error
      }
    }
  }, [cart, isLoggedIn, user?.email])

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  const discountAmount = useMemo(() => {
    if (!couponCode || discountPercent <= 0) return 0
    return Math.round((subtotal * discountPercent) / 100)
  }, [subtotal, couponCode, discountPercent])

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount)
  }, [subtotal, discountAmount])

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand || 'Mini GT',
          subDetails:
            product.subDetails ||
            `${product.brand || 'Collector Brand'} • 1:64 Scale`,
          price: product.price,
          quantity,
          image: product.image,
        },
      ]
    })
  }

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase()
    if (clean === 'FIRST10' || clean === 'APEX10') {
      setCouponCode(clean)
      setDiscountPercent(10)
      return { success: true, message: 'Coupon applied! 10% off.' }
    }
    if (clean === 'APEX20') {
      setCouponCode(clean)
      setDiscountPercent(20)
      return { success: true, message: 'Coupon applied! 20% off.' }
    }
    return { success: false, message: 'Invalid coupon code.' }
  }

  const removeCoupon = () => {
    setCouponCode('')
    setDiscountPercent(0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discountAmount,
        total,
        couponCode,
        discountPercent,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
