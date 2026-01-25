import { useState, useEffect } from 'react'
import './Header.css'
import {
  getAchievementStats,
  onAchievementUnlock,
  trackLogoClick
} from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'
import { Language } from '../services/languageService'

interface HeaderProps {
  onOpenAchievements: () => void
  onOpenInfo: () => void
  onOpenWallet: () => void
}

function Header({ onOpenAchievements, onOpenInfo, onOpenWallet }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('profile')
  const [achievementStats, setAchievementStats] = useState(getAchievementStats())
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showLanguageSubmenu, setShowLanguageSubmenu] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)

    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 100
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      section.classList.add('highlight-pulse')
      setTimeout(() => section.classList.remove('highlight-pulse'), 2000)
    }
  }

  useEffect(() => {
    const unsubscribe = onAchievementUnlock(() => {
      setAchievementStats(getAchievementStats())
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'projects', 'contact', 'skills']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      let currentSection = 'profile'
      let closestDistance = Infinity

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionMiddle = rect.top + window.scrollY + rect.height / 2
          const distance = Math.abs(scrollPosition - sectionMiddle)

          if (distance < closestDistance) {
            closestDistance = distance
            currentSection = sectionId
          }
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setShowLanguageSubmenu(false)
    setShowUserDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.user-dropdown-btn') && !target.closest('.user-dropdown-menu')) {
        setShowUserDropdown(false)
        setShowLanguageSubmenu(false)
      }
    }

    if (showUserDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showUserDropdown])

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-topbar">
        <div className="header-topbar-container">
          <div className="topbar-left"></div>

          <div className="topbar-right">
            <button className="info-btn" onClick={onOpenInfo}>
              ℹ️ {t.info}
            </button>

            <button
              className="achievement-badge-btn-topbar"
              onClick={onOpenAchievements}
            >
              🏆 {achievementStats.unlockedCount}/{achievementStats.totalCount}
            </button>

            <div style={{ position: 'relative' }}>
              <button
                className="user-dropdown-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <span className="user-name">Krishna Patil</span>
                ▼
              </button>

              {showUserDropdown && (
                <div className="user-dropdown-menu">
                  <button className="dropdown-item">
                    Account: <span className="account-name">tgkrish</span>
                  </button>

                  <button className="dropdown-item" onClick={onOpenWallet}>
                    View my wallet <span className="account-name">₹0.00</span>
                  </button>

                  <div
                    className="dropdown-item dropdown-language"
                    onMouseEnter={() => setShowLanguageSubmenu(true)}
                    onMouseLeave={() => setShowLanguageSubmenu(false)}
                  >
                    Change language

                    {showLanguageSubmenu && (
                      <div className="dropdown-submenu">
                        {(['english','sarcasm','binary','emoji','lorem','youngStunnah'] as Language[]).map(lang => (
                          <button
                            key={lang}
                            className="dropdown-submenu-item"
                            onClick={() => handleLanguageSelect(lang)}
                          >
                            {lang} {language === lang && '✓'}
                          </button>
                        ))}

                        <div className="dropdown-divider"></div>

                        <a
                          href="https://github.com/krishnapatil2006/portfolio/issues/new"
                          className="dropdown-submenu-item dropdown-submenu-report"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Report a translation problem
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    className="dropdown-item dropdown-signout"
                    onClick={() => (window.location.href = '/satire-signout')}
                  >
                    Sign out...
                  </button>
                </div>
              )}
            </div>

            <a href="#profile" className="user-avatar-link">
              <img
                src="/profile-avatar.gif"
                alt="Krishna Patil Avatar"
                className="user-avatar-img"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="header-main">
        <div className="header-container">
          <div className="header-left">
            <div className="logo" onClick={trackLogoClick}>
              <img src="/tgkrish.png" alt="tgkrish Logo" className="logo-img" />
              <span className="logo-text">{t.portfolioTitle}</span>
            </div>

            <nav className="nav">
              {['profile','projects','contact','skills'].map(id => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                  onClick={(e) => scrollToSection(e, id)}
                >
                  {t[id as keyof typeof t]}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
