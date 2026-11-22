import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user, isLoggedIn } = useAuth()

  const [wishlist, setWishlist] = useState(() => {
    if (!isLoggedIn || !user?.email) return []
    try {
      const saved = localStorage.getItem(`apex_wishlist_${user.email}`)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Sync with logged-in user changes
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      try {
        const saved = localStorage.getItem(`apex_wishlist_${user.email}`)
        setWishlist(saved ? JSON.parse(saved) : [])
      } catch {
        setWishlist([])
      }
    } else {
      setWishlist([])
    }
  }, [isLoggedIn, user?.email])

  // Save wishlist changes for the logged-in user
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      try {
        localStorage.setItem(`apex_wishlist_${user.email}`, JSON.stringify(wishlist))
      } catch {
        // Storage error
      }
    }
  }, [wishlist, isLoggedIn, user?.email])

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

export default WishlistContext
