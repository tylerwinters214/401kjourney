'use client'

import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { formatCurrency } from '../utils/calculations'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

function ResultsPanel({ results, inputs }) {
  const chartData = {
    labels: results.chartData.map(d => d.age),
    datasets: [
      { 
        label: 'Total Contributions', 
        data: results.chartData.map(d => d.contributions), 
        backgroundColor: 'rgba(99, 102, 241, 0.2)', 
        borderColor: 'rgba(99, 102, 241, 1)', 
        fill: true, 
        pointRadius: 0, 
        borderWidth: 2, 
        tension: 0.4 
      },
      { 
        label: 'Investment Growth', 
        data: results.chartData.map(d => d.growth), 
        backgroundColor: 'rgba(16, 185, 129, 0.2)', 
        borderColor: 'rgba(16, 185, 129, 1)', 
        fill: true, 
        pointRadius: 0, 
        borderWidth: 2, 
        tension: 0.4 
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      x: { grid: { color: 'rgba(100, 116, 139, 0.2)' } }, 
      y: { 
        stacked: true, 
        ticks: { callback: (value) => formatCurrency(value, 0) }, 
        grid: { color: 'rgba(100, 116, 139, 0.2)' } 
      } 
    },
    plugins: { 
      tooltip: { 
        callbacks: { 
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}` 
        } 
      } 
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Your Retirement Projection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Future Nest Egg</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(results.finalNestEggFutureDollars)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Projected value at age {inputs.retirementAge}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nest Egg (Today's $)</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(results.finalNestEggTodaysDollars)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Adjusted for inflation & after-tax</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Est. Monthly Income</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(results.monthlyRetirementIncome)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">After-tax, in today's dollars</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Savings Growth Over Time</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">This chart shows how your savings could grow, separating your contributions from investment returns.</p>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default ResultsPanel
