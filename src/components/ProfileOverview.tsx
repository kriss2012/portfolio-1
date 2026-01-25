import { useState, useEffect, useRef, useMemo } from 'react'
import './ProfileOverview.css'
import { portfolioConfig } from '../config/portfolio.config'
import { fetchUserProfile } from '../services/github'
import { useLanguage } from '../contexts/LanguageContext'

function ProfileOverview() {
  const { t } = useLanguage()

  const [avatarUrl, setAvatarUrl] = useState<string>(
    portfolioConfig.personal.avatar || ''
  )

  const mountedRef = useRef(true)

  // Memoize description lines to avoid repeated split
  const descriptionLines = useMemo(
    () => t.profileDescription.split('\n'),
    [t.profileDescription]
  )

  useEffect(() => {
    mountedRef.current = true

    const loadGitHubAvatar = async () => {
      try {
        const profile = await fetchUserProfile()
        if (profile && mountedRef.current) {
          setAvatarUrl(profile.avatar_url)
        }
      } catch (error) {
        console.error('Failed to load GitHub avatar:', error)
      }
    }

    // Only fetch GitHub avatar if no custom avatar is provided
    if (!portfolioConfig.personal.avatar) {
      loadGitHubAvatar()
    }

    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <section className="profile-overview card" id="profile">
      <div className="profile-content">
        {/* Left: Avatar */}
        <div className="profile-left">
          <div className="avatar-container">
            <img
              src={
                avatarUrl ||
                `https://github.com/${portfolioConfig.social.github}.png`
              }
              alt={`${portfolioConfig.personal.name} avatar`}
              className="avatar"
              loading="lazy"
            />
            <div className="avatar-frame" />
          </div>
        </div>

        {/* Center: Info */}
        <div className="profile-center">
          <h1 className="profile-name">
            {portfolioConfig.personal.name}
          </h1>

          <p className="profile-title">
            {portfolioConfig.personal.title}
          </p>

          <div className="profile-location">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C5.2 0 3 2.2 3 5c0 3.5 5 11 5 11s5-7.5 5-11c0-2.8-2.2-5-5-5zm0 7.5c-1.4 0-2.5-1.1-2.5-2.5S6.6 2.5 8 2.5s2.5 1.1 2.5 2.5S9.4 7.5 8 7.5z" />
            </svg>
            <span>{portfolioConfig.personal.location}</span>
          </div>

          <p className="profile-description">
            {descriptionLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProfileOverview
