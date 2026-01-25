import { useCallback } from 'react'
import './Footer.css'
import { useLanguage } from '../contexts/LanguageContext'
import { portfolioConfig } from '../config/portfolio.config'

function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()
  const startYear = 2025 // Portfolio launch year
  const yearDisplay =
    startYear === currentYear
      ? `${currentYear}`
      : `${startYear} - ${currentYear}`

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const headerOffset = 100
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    // Highlight animation
    section.classList.add('highlight-pulse')
    const timeout = setTimeout(() => {
      section.classList.remove('highlight-pulse')
      clearTimeout(timeout)
    }, 2000)
  }, [])

  const quickLinks = [
    { name: t.profile, id: 'profile' },
    { name: t.projects, id: 'projects' },
    { name: t.contact, id: 'contact' },
    { name: t.skills, id: 'skills' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      url: `https://github.com/${portfolioConfig.social.github}`,
      icon: 'github',
      show: true,
    },
    {
      name: 'LinkedIn',
      url: portfolioConfig.social.linkedin,
      icon: 'linkedin',
      show: !!portfolioConfig.social.linkedin,
    },
    {
      name: 'Email',
      url: `mailto:${portfolioConfig.personal.email}`,
      icon: 'email',
      show: true,
    },
  ].filter(link => link.show)

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-container">

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">{t.footerQuickLinks}</h3>
            <ul className="footer-links">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    className="footer-link"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-column">
            <h3 className="footer-heading">{t.connectWithMe}</h3>
            <div className="footer-social-links">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                >
                  {link.icon === 'github' && (
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  )}
                  {link.icon === 'email' && (
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="footer-column footer-column-about">
            <h3 className="footer-heading">{t.footerAbout}</h3>
            <p className="footer-tagline">{t.footerTagline}</p>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {yearDisplay} {portfolioConfig.personal.name}. All rights reserved.
            </p>
            <p className="footer-made-with">
              {t.footerMadeWith}
              <span className="footer-steam-icon">🎮</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
