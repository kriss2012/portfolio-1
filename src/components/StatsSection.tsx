import { useState, useEffect, useRef } from 'react'
import './StatsSection.css'
import { getStats } from '../services/github'
import { ProcessedStats } from '../types'
import { trackSectionVisit } from '../services/achievementService'

// Animated counter hook
function useCountUp(
  end: number,
  duration = 2000,
  shouldStart = false
) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!shouldStart || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out
      setCount(Math.floor(end * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])

  return count
}

function StatsSection() {
  const [stats, setStats] = useState<ProcessedStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const hasTrackedRef = useRef(false)

  // Load GitHub stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (err) {
        console.error('Failed to load GitHub stats:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  // Visibility + achievement tracking
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (!hasTrackedRef.current) {
            trackSectionVisit('stats')
            hasTrackedRef.current = true
          }

          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const animatedProjects = useCountUp(
    stats?.totalProjects || 0,
    2000,
    isVisible && !loading
  )
  const animatedStars = useCountUp(
    stats?.totalStars || 0,
    2000,
    isVisible && !loading
  )
  const animatedForks = useCountUp(
    stats?.totalForks || 0,
    2000,
    isVisible && !loading
  )

  if (loading || !stats) {
    return (
      <div className="stats-section" id="stats">
        <section className="card stats-card">
          <div className="card-header">GitHub Stats</div>
          <div className="stats-content">
            <p className="loading-text">Loading GitHub data…</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="stats-section" id="stats" ref={sectionRef}>
      <section className="card stats-card">
        <div className="card-header">GitHub Stats</div>

        <div className="stats-content">
          {/* Core Stats */}
          <div className="stat-row">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value animated-counter">
              {animatedProjects.toLocaleString()}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">Total Stars</span>
            <span className="stat-value animated-counter">
              {animatedStars.toLocaleString()}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">Total Forks</span>
            <span className="stat-value animated-counter">
              {animatedForks.toLocaleString()}
            </span>
          </div>

          {/* Completion */}
          <div className="completion-section">
            <div className="completion-header">
              <span className="stat-label">Active Projects</span>
              <span className="completion-percentage">
                {stats.completionRate}%
              </span>
            </div>
            <div className="completion-bar">
              <div
                className="completion-fill"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="completion-note">
              Activity based on the last 12 months
            </p>
          </div>

          {/* Languages */}
          <div className="languages-section">
            <div className="stat-label">Top Languages</div>

            <div className="languages-bars">
              {stats.languages.map(lang => (
                <div
                  key={lang.name}
                  className="language-bar"
                  title={`${lang.name}: ${lang.percentage}%`}
                >
                  <div
                    className="language-fill"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="languages-legend">
              {stats.languages.map(lang => (
                <div key={lang.name} className="language-item">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="language-name">{lang.name}</span>
                  <span className="language-percentage">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatsSection
