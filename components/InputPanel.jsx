import React from 'react'
import { ContributionMode, SalaryIncreaseType } from '../utils/constants'

function InputPanel({ inputs, onInputChange }) {
  const handleChange = (field, value) => {
    onInputChange(field, typeof value === 'string' ? value : parseFloat(value) || 0)
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Your Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label htmlFor="currentAge" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Age</label>
          <input 
            type="number" 
            id="currentAge" 
            value={inputs.currentAge} 
            onChange={(e) => handleChange('currentAge', e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="retirementAge" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Retirement Age</label>
          <input 
            type="number" 
            id="retirementAge" 
            value={inputs.retirementAge} 
            onChange={(e) => handleChange('retirementAge', e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="annualIncome" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pre-Tax Annual Income</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500 sm:text-sm">$</span>
            </div>
            <input 
              type="number" 
              id="annualIncome" 
              value={inputs.annualIncome} 
              onChange={(e) => handleChange('annualIncome', e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="currentSavings" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Savings</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500 sm:text-sm">$</span>
            </div>
            <input 
              type="number" 
              id="currentSavings" 
              value={inputs.currentSavings} 
              onChange={(e) => handleChange('currentSavings', e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="currentSavingsTraditionalPercentage" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Savings Mix</label>
          <input 
            id="currentSavingsTraditionalPercentage" 
            type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={inputs.currentSavingsTraditionalPercentage} 
            onChange={(e) => handleChange('currentSavingsTraditionalPercentage', e.target.value)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1 px-1">
            <span className="font-medium text-slate-600 dark:text-slate-300">Roth: {100 - inputs.currentSavingsTraditionalPercentage}%</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">Traditional: {inputs.currentSavingsTraditionalPercentage}%</span>
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contributionValue" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {inputs.contributionMode === ContributionMode.FixedAmount ? 'Monthly Contribution' : 'Contribution Rate'}
          </label>
          <div className="grid grid-cols-5 gap-x-2">
            <div className="col-span-3 relative">
              {inputs.contributionMode === ContributionMode.FixedAmount && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 sm:text-sm">$</span>
                </div>
              )}
              <input 
                type="number" 
                id="contributionValue" 
                value={inputs.contributionValue} 
                onChange={(e) => handleChange('contributionValue', e.target.value)}
                className={`w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none ${inputs.contributionMode === ContributionMode.FixedAmount ? 'pl-7' : ''}`}
              />
              {inputs.contributionMode === ContributionMode.Percentage && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-slate-500 sm:text-sm">%</span>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <select 
                id="contributionMode" 
                value={inputs.contributionMode}
                onChange={(e) => handleChange('contributionMode', e.target.value)}
                className="w-full h-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value={ContributionMode.Percentage}>% / year</option>
                <option value={ContributionMode.FixedAmount}>$ / month</option>
              </select>
            </div>
          </div>
        </div>
        {inputs.contributionMode === ContributionMode.Percentage && (
          <div id="salary-increase-group">
            <label htmlFor="salaryIncreaseValue" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Annual Salary Increase</label>
            <div className="grid grid-cols-5 gap-x-2">
              <div className="col-span-3">
                <input 
                  type="number" 
                  id="salaryIncreaseValue" 
                  value={inputs.salaryIncreaseValue} 
                  step="0.1"
                  onChange={(e) => handleChange('salaryIncreaseValue', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                <select 
                  id="salaryIncreaseType" 
                  value={inputs.salaryIncreaseType}
                  onChange={(e) => handleChange('salaryIncreaseType', e.target.value)}
                  className="w-full h-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value={SalaryIncreaseType.Percentage}>%</option>
                  <option value={SalaryIncreaseType.Dollar}>$</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div>
          <label htmlFor="contributionType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Future Contribution Type</label>
          <select 
            id="contributionType" 
            value={inputs.contributionType}
            onChange={(e) => handleChange('contributionType', e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="Traditional">Traditional (Pre-Tax)</option>
            <option value="Roth">Roth (Post-Tax)</option>
          </select>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mt-6 md:col-span-2">Assumptions</h3>
        <div>
          <label htmlFor="rateOfReturn" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expected Annual Return</label>
          <div className="relative">
            <input 
              type="number" 
              id="rateOfReturn" 
              value={inputs.rateOfReturn} 
              onChange={(e) => handleChange('rateOfReturn', e.target.value)}
              className="w-full pr-10 pl-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="inflationRate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expected Inflation</label>
          <div className="relative">
            <input 
              type="number" 
              id="inflationRate" 
              value={inputs.inflationRate} 
              onChange={(e) => handleChange('inflationRate', e.target.value)}
              className="w-full pr-10 pl-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="retirementTaxRate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tax Rate in Retirement</label>
          <div className="relative">
            <input 
              type="number"
              id="retirementTaxRate" 
              value={inputs.retirementTaxRate} 
              onChange={(e) => handleChange('retirementTaxRate', e.target.value)}
              className="w-full pr-10 pl-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPanel
