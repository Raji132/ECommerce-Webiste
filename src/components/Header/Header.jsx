import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.svg';
import menuToggle from '../../assets/images/header_menu_toggle.svg';
import './Header.css'

const navigationLinks = [
  { label: 'Services', to: '/services' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'For professionals', to: '/for-professionals' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <div className="site-header__brand">
          <img src={logo} alt="logo" />
        </div>
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <img src={menuToggle} alt="toggle menu" />
        </button>

        <nav
          className={`site-header__navigation${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigationLinks.map(({ label, to }) => (
            <NavLink
              className={({ isActive }) =>
                `site-header__link${isActive ? ' is-active' : ''}`
              }
              key={to}
              to={to}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
