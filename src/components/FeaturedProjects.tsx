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
    setLoading(true)

    try {
      const results = await Promise.allSettled(
        portfolioConfig.featuredProjects
          .filter(p => p.featured)
          .map(p =>
            getFeaturedProject(
              portfolioConfig.social.github,
              p.repo
            )
          )
      )

      const successfulProjects = results
        .filter(
          (r): r is PromiseFulfilledResult<ProcessedProject> =>
            r.status === 'fulfilled' && r.value !== null
        )
        .map(r => r.value)

      setFeaturedProjects(successfulProjects)
    } catch (error) {
      console.error('Featured projects load failed:', error)
    } finally {
      setLoading(false)
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
                  src={project.image || '/project-fallback.png'}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      '/project-fallback.png')
                  }
                />
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

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
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-text">
          No featured projects available right now.
        </p>
      )}
    </section>
  )
}

export default FeaturedProjects
