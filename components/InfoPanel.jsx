import React, { useEffect, useId, useRef } from 'react'

function InfoPanel({ isVisible, onClose, panelId }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isVisible) return

    const previouslyFocused = document.activeElement
    const focusableSelector = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const getFocusableElements = () => {
      if (!panelRef.current) return []
      return Array.from(panelRef.current.querySelectorAll(focusableSelector)).filter(
        element => !element.hasAttribute('disabled')
      )
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus()
      }
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div 
      className={`info-panel ${isVisible ? 'is-visible' : ''}`}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="info-panel__content"
        onClick={(e) => e.stopPropagation()}
        ref={panelRef}
      >
        <button 
          className="info-panel__close-btn" 
          aria-label="Close About and How to Use panel"
          onClick={onClose}
          ref={closeButtonRef}
        >
          ×
        </button>
        
        <h2 id={titleId}>Welcome to 401k Journey!</h2>
        <p id={descriptionId}>Your ultimate <strong>free 401k and retirement calculator</strong>, supercharged with AI insights. This tool is designed for everyone—from savvy investors aiming to optimize their portfolio to beginners wanting to understand their path to retirement.</p>
        
        <h3>Why Use an AI-Powered 401k Calculator?</h3>
        <p>Planning for retirement involves many variables. 401k Journey helps you:</p>
        <ul>
          <li><strong>Visualize Your Growth:</strong> Instantly see a projection of your retirement savings, showing the powerful impact of compound interest over time.</li>
          <li><strong>Get AI-Powered Advice:</strong> Our AI Retirement Coach analyzes your unique situation to provide personalized, actionable tips to help you reach your goals faster.</li>
          <li><strong>Understand Key Metrics:</strong> Learn the difference between your "Future Nest Egg" and its value in "Today's Dollars," giving you a true sense of your future purchasing power.</li>
          <li><strong>Make Informed Decisions:</strong> See how changing your contribution rate, retirement age, or investment returns can dramatically alter your financial future.</li>
        </ul>

        <h3>How to Use 401k Journey: A Step-by-Step Guide</h3>
        <ol>
          <li><strong>Enter Your Details:</strong> Fill in your current age, desired retirement age, income, and current 401k or other retirement savings. The more accurate your inputs, the better your projection.</li>
          <li><strong>Set Your Contribution:</strong> Decide how much you'll save. You can choose a percentage of your annual income (great for keeping pace with raises) or a fixed dollar amount per month.</li>
          <li><strong>Adjust Your Assumptions:</strong> Fine-tune the "Assumptions" section. Your "Expected Annual Return" is a key driver of your projection. A conservative estimate is 7%, while 10% is more optimistic.</li>
          <li><strong>Analyze Your Projection:</strong> The chart and summary cards will update in real-time. Pay close attention to the **"Nest Egg (Today's $)"** as it reflects your real, spendable wealth after taxes and inflation.</li>
          <li><strong>Get AI Advice:</strong> Click the "Get AI Advice" button. Our AI coach will analyze your numbers and provide a personalized report with tips to enhance your retirement strategy.</li>
          <li><strong>Explore Next Steps:</strong> After receiving your AI advice, explore the "Next Steps" panel for curated, high-quality resources to help you take action on your plan.</li>
        </ol>
        <p>Take control of your financial future today with the best **free AI retirement calculator**. Your <strong>401k journey</strong> starts now!</p>
      </div>
    </div>
  )
}

export default InfoPanel
