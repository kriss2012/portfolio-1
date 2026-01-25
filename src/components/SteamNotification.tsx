import { useState, useEffect, useRef } from 'react'
import './SteamNotification.css'
import {
  getRandomNotification,
  SteamNotification as NotificationType,
} from '../config/steamNotifications.config'

interface ActiveNotification extends NotificationType {
  id: string
  timestamp: number
}

const MAX_NOTIFICATIONS = 3
const AUTO_DISMISS_TIME = 6000

function SteamNotification() {
  const [notifications, setNotifications] = useState<ActiveNotification[]>([])
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    let scheduleTimeout: number

    const scheduleNextNotification = () => {
      const randomDelay = Math.random() * 7000 + 5000 // 5–12s
      scheduleTimeout = window.setTimeout(() => {
        showRandomNotification()
        scheduleNextNotification()
      }, randomDelay)
    }

    // Initial delay
    scheduleTimeout = window.setTimeout(() => {
      showRandomNotification()
      scheduleNextNotification()
    }, 5000)

    return () => {
      clearTimeout(scheduleTimeout)
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const showRandomNotification = () => {
    setNotifications(prev => {
      if (prev.length >= MAX_NOTIFICATIONS) return prev

      const base = getRandomNotification()
      const timestamp = Date.now()

      const active: ActiveNotification = {
        ...base,
        id: `${base.id}-${timestamp}`,
        timestamp,
      }

      const dismissTimer = window.setTimeout(() => {
        removeNotification(timestamp)
      }, AUTO_DISMISS_TIME)

      timersRef.current.push(dismissTimer)

      return [...prev, active]
    })
  }

  const removeNotification = (timestamp: number) => {
    setNotifications(prev =>
      prev.filter(notification => notification.timestamp !== timestamp)
    )
  }

  return (
    <div className="steam-notification-container" aria-live="polite">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`steam-notification steam-notification-${notification.type}`}
          onClick={() => removeNotification(notification.timestamp)}
        >
          <div className="steam-notification-icon">
            {notification.avatar ? (
              <img
                src={notification.avatar}
                alt={notification.name}
                loading="lazy"
              />
            ) : (
              <div className="steam-notification-icon-placeholder">👤</div>
            )}
          </div>

          <div className="steam-notification-content">
            <div className="steam-notification-title">
              {notification.name}
            </div>
            <div className="steam-notification-message">
              {notification.message}
              {notification.action && (
                <span className="steam-notification-action">
                  {' '}
                  {notification.action}
                </span>
              )}
            </div>
          </div>

          <button
            className="steam-notification-close"
            aria-label="Dismiss notification"
            onClick={(e) => {
              e.stopPropagation()
              removeNotification(notification.timestamp)
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default SteamNotification
