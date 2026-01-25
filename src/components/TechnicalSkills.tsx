import { useEffect } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function TechnicalSkills() {
  const { t } = useLanguage()

  useEffect(() => {
    const skillsSection = document.getElementById('skills')
    if (!skillsSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionVisit('skills')
          observer.disconnect() // trigger once only
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(skillsSection)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className="showcase-card card tech-stack"
      aria-label="Technical Skills"
    >
      <div className="card-header">
        🤖 {t.technicalSkills}
      </div>

      <div className="skills-showcase">
        {Object.entries(portfolioConfig.technicalSkills).map(
          ([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">
                {category}
              </h3>

              <div className="skill-tags">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    title={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default TechnicalSkills
