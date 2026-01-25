import { useState, useEffect, useRef } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getFeaturedProject } from '../services/github'
import { ProcessedProject } from '../types'
import {
  unlockAchievement,
  trackAchievementHover,
  trackSectionVisit,
  trackProjectView,
} from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function Showcases() {
  const [featuredProjects, setFeaturedProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  const sectionsRef = useRef<Record<string, boolean>>({})

  // Load featured projects
  useEffect(() => {
    let mounted = true

    const loadFeaturedProjects = async () => {
      try {
        const projects = await Promise.all(
          portfolioConfig.featuredProjects
            .filter(p => p.featured)
            .map(p =>
              getFeaturedProject(
                portfolioConfig.social.github,
                p.repo
              )
            )
        )

        if (mounted) {
          setFeaturedProjects(
            projects.filter(Boolean) as ProcessedProject[]
          )
        }
      } catch (error) {
        console.error('Error loading featured projects:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadFeaturedProjects()

    return () => {
      mounted = false
    }
  }, [])

  // Track section visits (once each)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id =
            entry.target.getAttribute('id') ||
            entry.target.getAttribute('data-section')

          if (entry.isIntersecting && id && !sectionsRef.current[id]) {
            trackSectionVisit(id)
            sectionsRef.current[id] = true
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = document.querySelectorAll('[data-section], #projects, #skills')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="showcases">
      {/* Featured Projects */}
      <section
        id="projects"
        data-section="projects"
        className="showcase-card card featured-projects-section"
      >
        <div className="card-header">{t.featuredProjects}</div>

        {loading ? (
          <div className="featured-projects-grid loading">
            <p className="loading-text">{t.loading}</p>
          </div>
        ) : featuredProjects.length ? (
          <div className="featured-projects-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="featured-project-card">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-stats">
                      <div className="stat">
                        ⭐ {project.stars}
                      </div>
                      <div className="stat">
                        🍴 {project.forks}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tech">
                    {project.tech.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={() =>
                        trackProjectView(project.id.toString())
                      }
                    >
                      Code
                    </a>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link primary"
                        onClick={() =>
                          trackProjectView(project.id.toString())
                        }
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="error-text">Failed to load featured projects</p>
        )}
      </section>

      {/* Achievements */}
      <section
        className="showcase-card card achievements-showcase"
        data-section="achievements"
      >
        <div className="card-header">{t.achievementShowcase}</div>

        <div className="achievements-grid">
          {portfolioConfig.achievements.slice(0, 6).map(achievement => (
            <div
              key={achievement.id}
              className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
              onMouseEnter={() =>
                trackAchievementHover(achievement.id.toString())
              }
            >
              <div className="achievement-icon">
                {achievement.logo ? (
                  <img
                    src={achievement.logo}
                    alt={achievement.title}
                  />
                ) : (
                  achievement.icon
                )}
              </div>

              <div className="achievement-info">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
                {achievement.year && (
                  <span className="achievement-year">
                    {achievement.year}
                  </span>
                )}
              </div>

              {achievement.unlocked && <span className="check">✔</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies */}
      <section
        className="showcase-card card hobbies-showcase"
        data-section="hobbies"
      >
        <div className="card-header">{t.personalHobbies}</div>

        <div className="hobbies-grid">
          {portfolioConfig.hobbies.map(hobby => (
            <div
              key={hobby.id}
              className="hobby-card"
              onClick={() =>
                hobby.id === 3 &&
                unlockAchievement('fellow-gamer')
              }
            >
              <div className="hobby-icon">{hobby.icon}</div>
              <h4>{hobby.title}</h4>
              <p>{hobby.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section
        id="skills"
        data-section="skills"
        className="showcase-card card tech-stack"
      >
        <div className="card-header">{t.technicalSkills}</div>

        <div className="skills-showcase">
          {Object.entries(portfolioConfig.technicalSkills).map(
            ([category, skills]) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <div className="skill-tags">
                  {skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
}

export default Showcases
