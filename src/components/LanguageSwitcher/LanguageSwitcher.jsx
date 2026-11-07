import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const selectedLanguage = i18n.resolvedLanguage === 'ta' ? 'ta' : 'en'

  useEffect(() => {
    if (!isOpen) return undefined

    function handleOutsideClick(event) {
      if (!switcherRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  function chooseLanguage(language) {
    void i18n.changeLanguage(language)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function handleOptionKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowDown') {
      nextIndex = (index + 1) % 2
    } else if (event.key === 'ArrowUp') {
      nextIndex = (index + 1) % 2
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = 1
    } else {
      return
    }

    event.preventDefault()
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="language-switcher" ref={switcherRef}>
      <button
        className="language-switcher__trigger"
        ref={triggerRef}
        type="button"
        aria-label={t('language.label')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-options"
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg
          className="language-switcher__icon"
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M2.5 10h15M10 2c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span>{t(`language.${selectedLanguage === 'ta' ? 'tamil' : 'english'}`)}</span>
        <svg
          className={`language-switcher__chevron${isOpen ? ' is-open' : ''}`}
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {isOpen && (
        <div className="language-switcher__menu" id="language-options" role="menu">
          {[
            { code: 'en', label: t('language.english') },
            { code: 'ta', label: t('language.tamil') },
          ].map(({ code, label }, index) => (
            <button
              className={`language-switcher__option${selectedLanguage === code ? ' is-selected' : ''}`}
              key={code}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              role="menuitemradio"
              aria-checked={selectedLanguage === code}
              onClick={() => chooseLanguage(code)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span>{label}</span>
              {selectedLanguage === code && (
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path
                    d="m3 8 3.2 3.2L13 4.8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
