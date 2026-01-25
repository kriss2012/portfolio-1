import { useEffect, useRef } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { unlockAchievement, trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function PersonalHobbies() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasTrackedRef = useRef(false)

  // Track section visit once
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedRef.current) {
          trackSectionVisit('hobbies')
          hasTrackedRef.current = true
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="showcase-card card hobbies-showcase"
    >
      <div className="card-header">{t.personalHobbies}</div>

      <div className="hobbies-grid">
        {portfolioConfig.hobbies.map(hobby => (
          <div
            key={hobby.id}
            className="hobby-card"
            onClick={() =>
              hobby.id === 3 && unlockAchievement('fellow-gamer')
            }
          >
            <div className="hobby-icon">{hobby.icon}</div>

            <div className="hobby-content">
              <div className="hobby-header">
                <h4 className="hobby-title">{hobby.title}</h4>
                {hobby.status && (
                  <span className="hobby-status">
                    {hobby.status}
                  </span>
                )}
              </div>

              <p className="hobby-description">
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PersonalHobbies
