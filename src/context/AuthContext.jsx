import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('apex_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('apex_user')
      }
    } catch {
      // Ignore storage errors
    }
  }, [user])

  const login = (userData) => {
    const formattedUser = {
      email: userData.email,
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Collector'),
    }
    setUser(formattedUser)
    try {
      localStorage.setItem('apex_user', JSON.stringify(formattedUser))
    } catch {
      // Storage error
    }
    return formattedUser
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('apex_user')
    } catch {
      // Storage error
    }
  }

  const isLoggedIn = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
