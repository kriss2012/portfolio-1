import { useState, useRef } from 'react'
import './ResumeViewer.css'
import { portfolioConfig } from '../config/portfolio.config'
import { unlockAchievement } from '../services/achievementService'

function ResumeViewer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasUnlockedRef = useRef(false)

  const resumeUrl = portfolioConfig.personal.resumeUrl

  if (!resumeUrl) return null

  const handleExpandToggle = () => {
    if (!isExpanded && !hasUnlockedRef.current) {
      unlockAchievement('detail-oriented')
      hasUnlockedRef.current = true
    }
    setIsExpanded(prev => !prev)
  }

  return (
    <div className="resume-viewer card">
      <div className="card-header">
        <div className="resume-header-content">
          <span>Resume</span>

          <div className="resume-actions">
            <a
              href={resumeUrl}
              download="Krishna_Patil_Resume.pdf"
              className="resume-btn download-btn"
              title="Download Resume"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
              Download
            </a>

            <button
              onClick={handleExpandToggle}
              className="resume-btn expand-btn"
              title={isExpanded ? 'Collapse Resume' : 'Expand Resume'}
              aria-expanded={isExpanded}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                {isExpanded ? (
                  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                ) : (
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                )}
              </svg>
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </div>

      <div className={`resume-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="resume-preview">
          <iframe
            src={`${resumeUrl}#view=FitH`}
            title="Resume Preview"
            className="resume-iframe"
            loading="lazy"
          />

          <div className="resume-overlay">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn view-full-btn"
            >
              Open Full Screen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeViewer
