import { useEffect, useState, useRef } from 'react'
import { getReplayStats } from '../services/github'
import { GitHubReplayStats } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import './GitHubReplay.css'

const TOTAL_SLIDES = 6

export default function GitHubReplay() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<GitHubReplayStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isAnimating, setIsAnimating] = useState(false)

  const isMountedRef = useRef(true)

  const currentYear = new Date().getFullYear()
  const availableYears = [currentYear, currentYear - 1, currentYear - 2]

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [selectedYear])

  const loadStats = async () => {
    setLoading(true)
    try {
      const data = await getReplayStats(undefined, selectedYear)
      if (isMountedRef.current) {
        setStats(data)
      }
    } catch {
      if (isMountedRef.current) {
        setStats(null)
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }

  const animateSlideChange = (update: () => void) => {
    if (isAnimating) return
    setIsAnimating(true)
    update()
    setTimeout(() => setIsAnimating(false), 150)
  }

  const nextSlide = () =>
    animateSlideChange(() =>
      setCurrentSlide(prev => (prev + 1) % TOTAL_SLIDES)
    )

  const prevSlide = () =>
    animateSlideChange(() =>
      setCurrentSlide(prev => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)
    )

  const goToSlide = (index: number) =>
    animateSlideChange(() => setCurrentSlide(index))

  const formatHour = (hour: number) =>
    hour === 0 ? '12 AM' :
    hour < 12 ? `${hour} AM` :
    hour === 12 ? '12 PM' :
    `${hour - 12} PM`

  if (loading) {
    return (
      <section className="card github-replay">
        <div className="card-header">
          <div className="replay-header-content">
            <span>{t.replayTitle}</span>
            <div className="year-selector">
              <select value={selectedYear} onChange={e => setSelectedYear(+e.target.value)}>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="replay-loading">
          <div className="loading-spinner" />
          <p>{t.replayLoading}</p>
        </div>
      </section>
    )
  }

  if (!stats) {
    return (
      <section className="card github-replay">
        <div className="card-header">{t.replayTitle}</div>
        <div className="replay-error">
          <p>{t.replayError}</p>
        </div>
      </section>
    )
  }

  /* ---------- Slides ---------- */

  const renderSlide = () => {
    switch (currentSlide) {

      case 0:
        return (
          <div className="slide slide-overview">
            <div className="slide-emoji">🎮</div>
            <h3>{t.replayOverviewTitle}</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalCommits.toLocaleString()}</div>
                <div className="stat-label">{t.replayOverviewCommits}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.mostActiveMonth}</div>
                <div className="stat-label">{t.replayOverviewMostActiveMonth}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.longestStreak}</div>
                <div className="stat-label">{t.replayOverviewLongestStreak}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.daysCoded}</div>
                <div className="stat-label">{t.replayOverviewDaysCoded}</div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="slide slide-language">
            <div className="slide-emoji">💻</div>
            <h3>{t.replayLanguageTitle}</h3>

            <div className="language-hero">
              <div
                className="language-circle"
                style={{ borderColor: stats.topLanguage.color }}
              >
                <div className="language-percentage">{stats.topLanguage.percentage}%</div>
                <div className="language-name">{stats.topLanguage.name}</div>
              </div>

              <p className="language-subtitle">
                {t.replayLanguageSubtitle.replace('{language}', stats.topLanguage.name)}
              </p>
            </div>

            <div className="language-breakdown">
              {stats.languageBreakdown.map(lang => (
                <div key={lang.name} className="language-bar">
                  <div className="language-info">
                    <span className="language-dot" style={{ backgroundColor: lang.color }} />
                    <span className="language-text">{lang.name}</span>
                    <span className="language-percent">{lang.percentage}%</span>
                  </div>
                  <div className="language-progress">
                    <div
                      className="language-fill"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="slide slide-productivity">
            <div className="slide-emoji">⏰</div>
            <h3>{t.replayProductivityTitle}</h3>

            <div className="productivity-row">
              <div className="productivity-card">
                <div className="productivity-day">{stats.mostProductiveDay}</div>
                <div className="productivity-label">{t.replayProductivityMostProductiveDay}</div>
              </div>
              <div className="productivity-card">
                <div className="productivity-hour">
                  {formatHour(stats.peakCodingHour)}
                </div>
                <div className="productivity-label">{t.replayProductivityPeakHour}</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="card github-replay">
      <div className="card-header">
        <div className="replay-header-content">
          <span>{t.replayTitle}</span>
          <div className="year-selector">
            <select value={selectedYear} onChange={e => setSelectedYear(+e.target.value)}>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="replay-carousel">
        <button className="carousel-nav prev" onClick={prevSlide} disabled={isAnimating}>◀</button>

        <div className={`carousel-content ${isAnimating ? 'animating' : ''}`}>
          {renderSlide()}
        </div>

        <button className="carousel-nav next" onClick={nextSlide} disabled={isAnimating}>▶</button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            className={`dot ${currentSlide === i ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  )
}
