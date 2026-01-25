import { useState, useEffect, useRef } from 'react'
import './ProfileStats.css'
import {
  getYearsOfExperience,
  portfolioConfig,
  getWorkStatusConfig,
} from '../config/portfolio.config'
import { fetchUserProfile, getStats } from '../services/github'
import {
  calculateXPFromSources,
  calculateLevelFromXP,
} from '../utils/steamXP'
import { getLevelBorderStyle } from '../utils/steamLevelColors'
import { useLanguage } from '../contexts/LanguageContext'
import {
  getAchievementStats,
  onAchievementUnlock,
} from '../services/achievementService'

// Calculate developer level (Steam-like XP system)
function calculateLevel(stats: {
  repos: number
  followers: number
  stars: number
  years: number
  achievementsXP?: number
}) {
  const totalXP = calculateXPFromSources(stats)
  return calculateLevelFromXP(totalXP)
}

// Extract gradient colors for SVG
function extractGradientColors(
  gradientString: string
): { start: string; end: string } {
  const matches = gradientString.match(/#[0-9A-Fa-f]{6}/g)

  if (matches?.length >= 2) {
    return { start: matches[0], end: matches[1] }
  }

  if (matches?.length === 1) {
    return { start: matches[0], end: matches[0] }
  }

  return { start: '#4A90E2', end: '#357ABD' }
}

function ProfileStats() {
  const [repos, setRepos] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [stars, setStars] = useState(0)
  const [achievementsXP, setAchievementsXP] = useState(0)
  const [achievementMeta, setAchievementMeta] = useState({
    unlockedCount: 0,
    totalCount: 0,
  })
  const [loading, setLoading] = useState(true)

  const mountedRef = useRef(true)

  const yearsOfExperience = getYearsOfExperience()
  const statusConfig = getWorkStatusConfig(
    portfolioConfig.workStatus.status
  )
  const { t } = useLanguage()

  const stats = {
    repos,
    followers,
    stars,
    years: yearsOfExperience,
    achievementsXP,
  }

  const { level, currentLevelXP, nextLevelXP, progress } =
    calculateLevel(stats)

  const levelStyle = getLevelBorderStyle(level)

  // Load GitHub stats
  useEffect(() => {
    mountedRef.current = true

    const loadGitHubData = async () => {
      try {
        const profile = await fetchUserProfile()
        const repoStats = await getStats()

        if (!mountedRef.current) return

        if (profile) {
          setRepos(profile.public_repos)
          setFollowers(profile.followers)
        }

        if (repoStats) {
          setStars(repoStats.totalStars)
        }
      } catch (error) {
        console.error('Error loading GitHub data:', error)
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    }

    loadGitHubData()

    return () => {
      mountedRef.current = false
    }
  }, [])

  // Load & react to achievement XP
  useEffect(() => {
    const updateAchievements = () => {
      const stats = getAchievementStats()
      setAchievementsXP(stats.totalXP)
      setAchievementMeta({
        unlockedCount: stats.unlockedCount,
        totalCount: stats.totalCount,
      })
    }

    updateAchievements()

    const unsubscribe = onAchievementUnlock(updateAchievements)
    return unsubscribe
  }, [])

  // Dynamic CSS variables
  const levelCSSVars = {
    '--level-color': levelStyle.color,
    '--level-glow-color': levelStyle.glow || levelStyle.color,
    '--level-badge-bg': `${levelStyle.color}15`,
  } as React.CSSProperties

  const gradientColors = levelStyle.gradient
    ? extractGradientColors(levelStyle.gradient)
    : { start: levelStyle.color, end: levelStyle.color }

  return (
    <div className="profile-stats-card card" style={levelCSSVars}>
      <div className="card-header">{t.developerLevel}</div>

      {/* Level Display */}
      <div className="level-section">
        <div className="level-display">
          <div className="level-circle">
            <svg
              className={`level-ring ${levelStyle.glow ? 'has-glow' : ''} ${
                levelStyle.shimmer ? 'has-shimmer' : ''
              } ${levelStyle.rainbow ? 'has-rainbow' : ''}`}
              viewBox="0 0 120 120"
            >
              <defs>
                {levelStyle.rainbow ? (
                  <linearGradient
                    id={`level-gradient-${level}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FF0080" />
                    <stop offset="50%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#8000FF" />
                  </linearGradient>
                ) : levelStyle.gradient ? (
                  <linearGradient
                    id={`level-gradient-${level}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={gradientColors.start}
                    />
                    <stop
                      offset="100%"
                      stopColor={gradientColors.end}
                    />
                  </linearGradient>
                ) : null}
              </defs>

              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={
                  levelStyle.gradient || levelStyle.rainbow
                    ? `url(#level-gradient-${level})`
                    : levelStyle.color
                }
                strokeWidth="8"
              />
            </svg>

            <div
              className={`level-number ${
                levelStyle.glow ? 'has-glow' : ''
              } ${levelStyle.rainbow ? 'has-rainbow' : ''}`}
            >
              {loading ? '…' : level}
            </div>
          </div>

          <div className="level-info">
            <h3 className="level-title">
              {t.level} {loading ? '…' : level} {t.developer}
            </h3>
            <p className="level-subtitle">
              {yearsOfExperience}+ {t.yearsOfExperience}
            </p>

            <div
              className="work-status-badge"
              style={{ borderColor: statusConfig.color }}
            >
              <span
                className="status-dot"
                style={{
                  background: statusConfig.color,
                  boxShadow: `0 0 8px ${statusConfig.color}`,
                }}
              />
              {t.workStatus}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="xp-progress">
          <div className="xp-bar-container">
            <div
              className="xp-bar-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="xp-bar-glow" />
            </div>
          </div>

          <div className="xp-text">
            {loading
              ? t.loading
              : `${currentLevelXP.toLocaleString()} / ${nextLevelXP.toLocaleString()} XP`}
          </div>
        </div>
      </div>

      {/* Stats Badges */}
      <div className="profile-stats-badges">
        <div className="stat-badge projects-badge">
          <span>{t.repositories}</span>
          <strong>{loading ? '…' : repos}</strong>
          <small>+{(repos * 100).toLocaleString()} XP</small>
        </div>

        <div className="stat-badge followers-badge">
          <span>{t.followers}</span>
          <strong>{loading ? '…' : followers}</strong>
          <small>+{(followers * 50).toLocaleString()} XP</small>
        </div>

        <div className="stat-badge stars-badge">
          <span>{t.totalStars}</span>
          <strong>{loading ? '…' : stars}</strong>
          <small>+{(stars * 10).toLocaleString()} XP</small>
        </div>

        <div className="stat-badge experience-badge">
          <span>{t.yearsOfExperience}</span>
          <strong>{yearsOfExperience}+</strong>
          <small>+{(yearsOfExperience * 500).toLocaleString()} XP</small>
        </div>

        <div className="stat-badge achievements-badge">
          <span>{t.achievements}</span>
          <strong>
            {achievementMeta.unlockedCount}/{achievementMeta.totalCount}
          </strong>
          <small>+{achievementsXP.toLocaleString()} XP</small>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
