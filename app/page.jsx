'use client'

import { useState, useEffect } from 'react'
import InputPanel from '../components/InputPanel'
import ResultsPanel from '../components/ResultsPanel'
import GeminiCoach from '../components/GeminiCoach'
import AffiliatePanel from '../components/AffiliatePanel'
import InfoPanel from '../components/InfoPanel'
import { calculateProjection } from '../utils/calculations'
import { DEFAULT_INPUTS } from '../utils/constants'

export default function Home() {
  const [inputs, setInputs] = useState({ ...DEFAULT_INPUTS })
  const [results, setResults] = useState(null)
  const [geminiAdvice, setGeminiAdvice] = useState(null)
  const [isAdviceLoading, setIsAdviceLoading] = useState(false)
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState(false)

  useEffect(() => {
    const newResults = calculateProjection(inputs)
    setResults(newResults)
    setGeminiAdvice(null)
  }, [inputs])

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGetAdvice = async () => {
    setIsAdviceLoading(true)
    setGeminiAdvice(null)

    try {
      // Call Next.js API route here
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs,
          results
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get advice')
      }

      const data = await response.json()
      setGeminiAdvice(data.advice)
    } catch (error) {
      console.error("An error occurred in getRetirementAdvice:", error)
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      })
      
      // Show the actual error message from the API if available
      const errorMessage = error.message || "Sorry, I couldn't fetch advice right now. Please check your connection and try again."
      setGeminiAdvice(errorMessage)
    } finally {
      setIsAdviceLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">401k Journey</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">Project your financial future with our retirement calculator and get personalized AI-powered insights.</p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <button 
            id="info-toggle-btn" 
            className="info-btn" 
            title="About & How to Use"
            onClick={() => setIsInfoPanelVisible(true)}
          >
            ?
          </button>
          <InfoPanel 
            isVisible={isInfoPanelVisible}
            onClose={() => setIsInfoPanelVisible(false)}
          />
          <div className="lg:col-span-2">
            <InputPanel inputs={inputs} onInputChange={handleInputChange} />
          </div>
          <div className="lg:col-span-3">
            {results && <ResultsPanel results={results} inputs={inputs} />}
            <GeminiCoach 
              advice={geminiAdvice}
              isLoading={isAdviceLoading}
              onGetAdvice={handleGetAdvice}
            />
            {geminiAdvice && <AffiliatePanel />}
          </div>
        </main>
        <footer className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
          <p>This calculator is for illustrative purposes only and does not constitute financial advice.</p>
          <p>&copy; {new Date().getFullYear()} AI Retirement Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
