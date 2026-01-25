import { useState, useEffect, useRef } from 'react'
import './SocialSection.css'
import { portfolioConfig } from '../config/portfolio.config'
import { fetchUserProfile } from '../services/github'
import {
  unlockAchievement,
  trackSectionVisit,
} from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function SocialSection() {
  const [followers, setFollowers] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  const sectionRef = useRef<HTMLDivElement>(null)
  const hasTrackedRef = useRef(false)

  // Load GitHub followers
  useEffect(() => {
    let mounted = true

    const loadFollowers = async () => {
      try {
        const profile = await fetchUserProfile()
        if (profile && mounted) {
          setFollowers(profile.followers)
        }
      } catch (error) {
        console.error('Error loading followers:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadFollowers()

    return () => {
      mounted = false
    }
  }, [])

  // Track section visit
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedRef.current) {
          trackSectionVisit('contact')
          hasTrackedRef.current = true
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const handleSocialClick = (name: string) => {
    switch (name) {
      case 'GitHub':
        unlockAchievement('star-gazer')
        break
      case 'LinkedIn':
        unlockAchievement('socially-active')
        break
      case 'Email':
        unlockAchievement('contact-initiator')
        break
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: `https://github.com/${portfolioConfig.social.github}`,
      icon: 'github',
      enabled: true,
    },
    {
      name: 'LinkedIn',
      url: portfolioConfig.social.linkedin,
      icon: 'linkedin',
      enabled: Boolean(portfolioConfig.social.linkedin),
    },
    {
      name: 'Twitter',
      url: portfolioConfig.social.twitter,
      icon: 'twitter',
      enabled: Boolean(portfolioConfig.social.twitter),
    },
    {
      name: 'Email',
      url: `mailto:${portfolioConfig.personal.email}`,
      icon: 'email',
      enabled: true,
    },
  ].filter(link => link.enabled)

  return (
    <div className="social-section" id="contact" ref={sectionRef}>
      <section className="card connections-card">
        <div className="card-header">{t.connectWithMe}</div>

        <div className="connections-content">
          <div className="connections-count">
            <span className="count-number">
              {loading ? '—' : followers.toLocaleString()}
            </span>
            <span className="count-label">{t.githubFollowers}</span>
          </div>

          <div className="social-links">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                aria-label={link.name}
                onClick={() => handleSocialClick(link.name)}
              >
                {link.icon === 'github' && (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                )}

                {link.icon === 'linkedin' && (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.943 13.394V6.169H2.542v7.225h2.401zM3.742 5.182c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zM13.394 13.394V9.359c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401z" />
                  </svg>
                )}

                {link.icon === 'twitter' && (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75z" />
                  </svg>
                )}

                {link.icon === 'email' && (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  </svg>
                )}
              </a>
            ))}
          </div>

          <div className="contact-info">
            <p className="contact-item">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${portfolioConfig.personal.email}`}>
                {portfolioConfig.personal.email}
              </a>
            </p>

            {portfolioConfig.personal.phone && (
              <p className="contact-item">
                <strong>Phone:</strong> {portfolioConfig.personal.phone}
              </p>
            )}

            <p className="contact-item">
              <strong>Location:</strong> {portfolioConfig.personal.location}
            </p>
          </div>
        </div>
      </section>

      {portfolioConfig.showTestimonials && (
        <section className="card testimonials-card">
          <div className="card-header">Testimonials</div>
          <p className="info-text">
            Testimonials will appear here once added.
          </p>
        </section>
      )}
    </div>
  )
}

export default SocialSection
