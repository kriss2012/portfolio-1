import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './ActivityFeed.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getProcessedActivity } from '../services/github'
import { ProcessedActivity } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import { trackSectionVisit } from '../services/achievementService'

const WEEKS = 12
const DAYS = 7

// Generate activity heatmap data
function generateActivityHeatmap(
  activities: ProcessedActivity[],
  weeks = WEEKS,
  days = DAYS
): number[][] {
  const heatmap = Array.from({ length: weeks }, () =>
    Array(days).fill(0)
  )

  activities.forEach(activity => {
    const match = activity.time.match(/(\d+)\s+(second|minute|hour|day|week)s?\s+ago/)
    if (!match) return

    const value = Number(match[1])
    const unit = match[2]

    const daysAgo =
      unit === 'week' ? value * 7 :
      unit === 'day' ? value :
      0

    if (daysAgo >= weeks * days) return

    const weekIndex = Math.floor(daysAgo / 7)
    const dayIndex = daysAgo % 7

    heatmap[weeks - 1 - weekIndex][dayIndex]++
  })

  return heatmap
}

function ActivityFeed() {
  const [activities, setActivities] = useState<ProcessedActivity[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const loadActivity = useCallback(async () => {
    let isMounted = true
    try {
      setLoading(true)
      const data = await getProcessedActivity()
      if (isMounted) setActivities(data)
    } catch (error) {
      console.error('Error loading activity:', error)
    } finally {
      if (isMounted) setLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    loadActivity()
  }, [loadActivity])

  // Track section visit
  useEffect(() => {
    if (!sectionRef.current) return

    let tracked = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionVisit('activity')
          tracked = true
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const heatmapData = useMemo(
    () => generateActivityHeatmap(activities),
    [activities]
  )

  const maxActivity = Math.max(...heatmapData.flat(), 1)
  const totalContributions = activities.length

  return (
    <section
      className="card activity-feed"
      id="activity"
      ref={sectionRef}
    >
      <div className="card-header">{t.recentActivity}</div>

      {loading ? (
        <div className="activity-list">
          <p className="loading-text">{t.loading}</p>
        </div>
      ) : activities.length > 0 ? (
        <>
          {/* Contribution Heatmap */}
          <div className="contribution-heatmap">
            <div className="heatmap-header">
              <span className="heatmap-title">
                {totalContributions} {t.contributions}
              </span>
              <div className="heatmap-legend">
                <span className="legend-label">{t.less}</span>
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`legend-box intensity-${level}`}
                    title={
                      level === 0
                        ? 'No contributions'
                        : `${level} contribution level`
                    }
                  />
                ))}
                <span className="legend-label">{t.more}</span>
              </div>
            </div>

            <div className="heatmap-grid">
              <div className="heatmap-labels">
                {['Mon', 'Wed', 'Fri'].map((day, i) => (
                  <div
                    key={day}
                    className="heatmap-day-label"
                    style={{ gridRow: [2, 4, 6][i] }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="heatmap-content">
                <div className="heatmap-months">
                  {heatmapData.map((_, weekIndex) => {
                    const date = new Date()
                    date.setDate(date.getDate() - (WEEKS - weekIndex) * 7)
                    const month = date.toLocaleDateString('en-US', { month: 'short' })

                    const prevDate = new Date(date)
                    prevDate.setDate(prevDate.getDate() - 7)

                    const showMonth =
                      weekIndex === 0 ||
                      date.getMonth() !== prevDate.getMonth()

                    return (
                      <div key={weekIndex} className="heatmap-month-label">
                        {showMonth ? month : ''}
                      </div>
                    )
                  })}
                </div>

                <div className="heatmap-weeks">
                  {heatmapData.map((week, weekIndex) => (
                    <div key={weekIndex} className="heatmap-week">
                      {week.map((count, dayIndex) => {
                        const intensity =
                          count === 0
                            ? 0
                            : Math.ceil((count / maxActivity) * 4)

                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`heatmap-day intensity-${intensity}`}
                            title={`${count} contribution${count !== 1 ? 's' : ''}`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className="activity-list">
            {activities.slice(0, 8).map((activity, index) => (
              <div key={`${activity.id}-${index}`} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-text">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-target">{activity.target}</span>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://github.com/${portfolioConfig.social.github}`}
            className="view-all-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.viewAllActivity} →
          </a>
        </>
      ) : (
        <div className="activity-list">
          <p className="error-text">No recent activity</p>
        </div>
      )}
    </section>
  )
}

export default ActivityFeed
