import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/logo.svg'
import './Footer.css'

function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const footerSections = [
    {
      title: t('footer.sections.company'),
      links: [
        { label: t('footer.links.about'), to: '/#about' },
        { label: t('footer.links.story'), to: '/#our-story' },
      ],
    },
    {
      title: t('footer.sections.customers'),
      links: [
        { label: t('footer.links.services'), to: '/services' },
        { label: t('footer.links.bookings'), to: '/#my-bookings' },
      ],
    },
    {
      title: t('footer.sections.professionals'),
      links: [
        { label: t('footer.links.partner'), to: '/for-professionals' },
        { label: t('footer.links.resources'), to: '/#partner-resources' },
      ],
    },
    {
      title: t('footer.sections.contact'),
      links: [
        { label: t('footer.links.help'), to: '/#help' },
        {
          label: 'hello@quicksearch.example',
          to: 'mailto:hello@quicksearch.example',
          isExternal: true,
        },
      ],
    },
  ]

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="site-footer__brand">
          <Link to="/" aria-label={t('navigation.logoAlt')}>
            <img src={logo} alt={t('navigation.logoAlt')} />
          </Link>
          <p className="site-footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="site-footer__grid">
          {footerSections.map((section) => (
            <div className="site-footer__column" key={section.title}>
              <h2 className="site-footer__heading">{section.title}</h2>
              <ul className="site-footer__links">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.to}
                        className="site-footer__link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="site-footer__link"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <span className="site-footer__separator" aria-hidden="true">&middot;</span>
          <Link to="/#privacy" className="site-footer__legal-link">
            {t('footer.privacy')}
          </Link>
          <span className="site-footer__separator" aria-hidden="true">&middot;</span>
          <Link to="/#terms" className="site-footer__legal-link">
            {t('footer.terms')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
