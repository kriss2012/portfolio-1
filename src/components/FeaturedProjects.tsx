import { useEffect, useState, useCallback } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getFeaturedProject } from '../services/github'
import { ProcessedProject } from '../types'
import { trackSectionVisit, trackProjectView } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  const loadFeaturedProjects = useCallback(async () => {
    let isMounted = true
    try {
      setLoading(true)

      const projects = await Promise.all(
        portfolioConfig.featuredProjects
          .filter(project => project.featured)
          .map(project =>
            getFeaturedProject(portfolioConfig.social.github, project.repo)
          )
      )

      if (isMounted) {
        setFeaturedProjects(
          projects.filter(Boolean) as ProcessedProject[]
        )
      }
    } catch (error) {
      console.error('Error loading featured projects:', error)
    } finally {
      if (isMounted) setLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    loadFeaturedProjects()
  }, [loadFeaturedProjects])

  // Track section visit
  useEffect(() => {
    const section = document.getElementById('projects')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionVisit('projects')
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      className="showcase-card card featured-projects-section"
    >
      <div className="card-header">{t.featuredProjects}</div>

      {loading ? (
        <div className="featured-projects-grid loading">
          <p className="loading-text">{t.loading}</p>
        </div>
      ) : featuredProjects.length > 0 ? (
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
                      <span className="stat-icon">⭐</span>
                      <span className="stat-value">{project.stars}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🍴</span>
                      <span className="stat-value">{project.forks}</span>
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
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackProjectView(project.id.toString())
                    }
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    Code
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      className="project-link primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackProjectView(project.id.toString())
                      }
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="featured-projects-grid">
          <p className="error-text">Failed to load featured projects</p>
        </div>
      )}
    </section>
  )
}

export default FeaturedProjects
