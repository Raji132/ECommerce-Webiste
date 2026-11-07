import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/logo.svg'
import menuToggle from '../../assets/images/header_menu_toggle.svg'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.jsx'
import LoginButton from '../common/LoginButton.jsx'
import './Header.css'

const navigationLinks = [
  { key: 'services', to: '/services' },
  { key: 'howItWorks', to: '/how-it-works' },
  { key: 'forProfessionals', to: '/for-professionals' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="site-header__brand" to="/" onClick={closeMenu}>
          <img src={logo} alt={t('navigation.logoAlt')} />
        </Link>

        <nav
          className={`site-header__navigation${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label={t('navigation.primaryLabel')}
        >
          {navigationLinks.map(({ key, to }) => (
            <NavLink
              className={({ isActive }) =>
                `site-header__link${isActive ? ' is-active' : ''}`
              }
              key={to}
              to={to}
              onClick={closeMenu}
            >
              {t(`navigation.${key}`)}
            </NavLink>
          ))}
          {/* <LoginButton className="site-header__mobile-login" onClick={closeMenu} /> */}
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <LoginButton className="site-header__desktop-login" />
          <button
            className="site-header__menu-toggle"
            type="button"
            aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <img src={menuToggle} alt="" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
