import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import supraImage from '../assets/images/07a9431e8b005f2559ec35d4678f0e2a0f2c4b73.png'
import porscheImage from '../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'
import skylineImage from '../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import defenderImage from '../assets/images/cd63661889dad3d8cbd1714ec55b6ec7a12450ca.png'

const CartContext = createContext(null)

const INITIAL_CART = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R R34',
    brand: 'Mini GT',
    subDetails: 'Mini GT • Bayside Blue • 1:64',
    price: 1299,
    quantity: 1,
    image: skylineImage,
  },
  {
    id: 2,
    name: 'Porsche 911 GT3 RS',
    brand: 'Hot Wheels',
    subDetails: 'Hot Wheels • Orange • 1:64',
    price: 899,
    quantity: 1,
    image: porscheImage,
  },
]

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_cart')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // Fallback
    }
    return INITIAL_CART
  })

  const [couponCode, setCouponCode] = useState('FIRST10')
  const [discountPercent, setDiscountPercent] = useState(10) // 10% discount

  useEffect(() => {
    try {
      localStorage.setItem('apex_cart', JSON.stringify(cart))
    } catch {
      // Storage error
    }
  }, [cart])

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