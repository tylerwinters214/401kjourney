import React from 'react'
import { AFFILIATE_LINKS } from '../utils/constants'

function AffiliatePanel() {
  const createLink = (item) => (
    <a 
      key={item.name}
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer sponsored" 
      className="block p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
    >
      <p className="font-semibold text-indigo-700 dark:text-indigo-400">{item.name}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
    </a>
  )

  return (
    <div className="mt-8 p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Next Steps to Improve Your Plan</h2>
      
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Checking, Savings, and Investing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AFFILIATE_LINKS.savingsAccounts.map(createLink)}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Recommended Reading</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AFFILIATE_LINKS.books.map(createLink)}
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 text-center">
        As an affiliate, we may earn from qualifying purchases. This doesn't affect our recommendations.
      </p>
    </div>
  )
}

export default AffiliatePanel
