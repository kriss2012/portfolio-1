import { useState, useEffect } from 'react'
import './WalletModal.css'
import { trackWalletOpen } from '../services/achievementService'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentTab = 'upi' | 'international'

function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>('upi')

  useEffect(() => {
    if (isOpen) {
      // Track wallet open achievement (only triggers once)
      trackWalletOpen()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="wallet-modal-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Support My Work ☕</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wallet-tabs">
          <button
            className={`wallet-tab ${activeTab === 'upi' ? 'active' : ''}`}
            onClick={() => setActiveTab('upi')}
          >
            🇮🇳 UPI
          </button>
          <button
            className={`wallet-tab ${activeTab === 'international' ? 'active' : ''}`}
            onClick={() => setActiveTab('international')}
          >
            🌍 International
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'upi' && (
            <div className="payment-section">
              <h3 className="payment-title">Pay via UPI</h3>
              <p className="payment-description">
                Scan the QR code using Google Pay, PhonePe, or Paytm.  
                Your support helps me build more AI & software projects 🚀
              </p>
              <div className="qr-code-container">
                <img
                  src="/upi-qr.jpg"
                  alt="UPI QR Code"
                  className="qr-code-image"
                />
              </div>
              <p className="payment-note">
                Supported apps: GPay • PhonePe • Paytm
              </p>
            </div>
          )}

          {activeTab === 'international' && (
            <div className="payment-section">
              <h3 className="payment-title">Support Internationally</h3>
              <p className="payment-description">
                If you’re outside India, you can support me using international payment platforms 🌎
              </p>
              <div className="wise-button-container">
                <a
                  href="https://buymeacoffee.com/202krishnas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wise-button"
                >
                  ☕ Buy Me a Coffee
                </a>
              </div>
              <p className="payment-note">
                Secure international payments • Cards supported
              </p>
            </div>
          )}

          <div className="wallet-footer">
            <p className="thank-you-message">
              Thank you for supporting my journey 💙  
              Every contribution motivates me to keep learning and building.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
