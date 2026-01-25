import { useEffect, useState, useRef } from 'react'
import './SignOutSatire.css'

const TOTAL_TIME = 5

function SignOutSatire() {
  const [countdown, setCountdown] = useState(TOTAL_TIME)
  const [message, setMessage] = useState('Signing out...')
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const messages = [
      'Wait... you were never signed in!',
      'But thanks for trying anyway 😅',
      'Redirecting you back to reality...',
      'Just kidding, back to the portfolio!',
      'See you in a moment...',
    ]

    // Update message based on countdown
    if (countdown > 0) {
      setMessage(messages[TOTAL_TIME - countdown])
    }

    intervalRef.current = window.setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          window.location.replace('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [countdown])

  return (
    <div className="signout-container">
      <div className="signout-content">
        <div className="signout-icon">🚪</div>

        <h1 className="signout-title">Sign Out</h1>

        <p className="signout-message">{message}</p>

        <div className="signout-countdown">
          <div className="countdown-circle">
            <svg className="countdown-ring" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(102, 192, 244, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#66c0f4"
                strokeWidth="8"
                strokeDasharray="339.292"
                strokeDashoffset={
                  339.292 * (1 - countdown / TOTAL_TIME)
                }
                transform="rotate(-90 60 60)"
                className="countdown-progress"
              />
            </svg>

            <div className="countdown-number">{countdown}</div>
          </div>

          <p className="countdown-text">
            Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}…
          </p>
        </div>

        <button
          className="signout-back-btn"
          onClick={() => window.location.replace('/')}
        >
          Go Back Now
        </button>

        <div className="signout-footer">
          <p className="signout-note">
            <strong>Pro tip:</strong> You can’t sign out of something you never signed into! 🎭
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignOutSatire
