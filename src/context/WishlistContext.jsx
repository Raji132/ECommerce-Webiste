import { createContext, useContext, useState, useEffect } from 'react'
import supraImage from '../assets/images/07a9431e8b005f2559ec35d4678f0e2a0f2c4b73.png'
import porscheImage from '../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'
import skylineImage from '../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import defenderImage from '../assets/images/cd63661889dad3d8cbd1714ec55b6ec7a12450ca.png'

const WishlistContext = createContext(null)

const INITIAL_WISHLIST = [
  {
    id: 1,
    name: 'Nissan GT-R R34',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 1299,
    image: skylineImage,
  },
  {
    id: 2,
    name: 'Porsche 911 GT3 RS',
    brand: 'Hot Wheels',
    brandTag: 'HOT WHEELS / 1:64 SCALE',
    scale: '1:64',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 899,
    image: porscheImage,
  },
  {
    id: 3,
    name: 'Land Rover Defender',
    brand: 'Matchbox',
    brandTag: 'MATCHBOX / 1:64 SCALE',
    scale: '1:64',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 649,
    image: defenderImage,
  },
  {
    id: 4,
    name: 'Toyota Supra MK4',
    brand: 'Mini GT',
    brandTag: 'MINI GT / 1:64 SCALE',
    scale: '1:64',
    rating: '4.8',
    reviews: '124',
    inStock: true,
    price: 1199,
    image: supraImage,
  },
]

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_wishlist')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // Fallback
    }
    return INITIAL_WISHLIST
  })

  useEffect(() => {
    try {
      localStorage.setItem('apex_wishlist', JSON.stringify(wishlist))
    } catch {
      // Storage error
    }
  }, [wishlist])

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id)
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}