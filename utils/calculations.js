import { ContributionMode, SalaryIncreaseType, ContributionType } from './constants'

export function calculateProjection(inputs) {
    const {
        currentAge, retirementAge, annualIncome, currentSavings,
        currentSavingsTraditionalPercentage, contributionValue, contributionMode,
        salaryIncreaseValue, salaryIncreaseType, contributionType,
        rateOfReturn, inflationRate, retirementTaxRate
    } = inputs;

    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
        return { finalNestEggFutureDollars: currentSavings, finalNestEggTodaysDollars: currentSavings, monthlyRetirementIncome: 0, chartData: [] };
    }
    const monthlyReturnRate = rateOfReturn / 100 / 12;

    // 1. Correctly split the INITIAL savings into Traditional and Roth buckets.
    let traditionalBalance = currentSavings * (currentSavingsTraditionalPercentage / 100);
    let rothBalance = currentSavings * ((100 - currentSavingsTraditionalPercentage) / 100);

    let currentSalary = annualIncome;
    let totalContributions = 0;
    const chartData = [];

    // --- Main Loop ---
    for (let year = 0; year < yearsToRetirement; year++) {
        let annualContribution = 0;
        if (contributionMode === ContributionMode.Percentage) {
            annualContribution = currentSalary * (contributionValue / 100);
        } else {
            annualContribution = contributionValue * 12;
        }
        
        const monthlyContribution = annualContribution / 12;
        totalContributions += annualContribution;

        for (let month = 0; month < 12; month++) {
            // 2. Grow each bucket independently based on its current balance.
            traditionalBalance *= (1 + monthlyReturnRate);
            rothBalance *= (1 + monthlyReturnRate);

            // 3. Add new monthly contributions to the correct bucket.
            if(contributionType === ContributionType.Traditional) {
                traditionalBalance += monthlyContribution;
            } else {
                rothBalance += monthlyContribution;
            }
        }

        // Apply salary increase at the end of the year for the next loop.
        if (contributionMode === ContributionMode.Percentage) {
            if (salaryIncreaseType === SalaryIncreaseType.Percentage) {
                currentSalary *= (1 + (salaryIncreaseValue / 100));
            } else {
                currentSalary += salaryIncreaseValue;
            }
        }
        
        // The chart data needs the total growth.
        const totalNestEgg = traditionalBalance + rothBalance;
        const totalGrowth = totalNestEgg - currentSavings - totalContributions;

        chartData.push({
            age: currentAge + year + 1,
            contributions: totalContributions + currentSavings,
            growth: totalGrowth,
            total: totalNestEgg
        });
    }

    // --- Final Calculations (This is the rewritten, correct part) ---
    const finalNestEggFutureDollars = traditionalBalance + rothBalance;
    const inflationFactor = Math.pow(1 + (inflationRate / 100), yearsToRetirement);

    // 4. Calculate the real, spendable value of each bucket.
    // TAX IS ONLY APPLIED TO THE TRADITIONAL BUCKET.
    const traditionalValueTodaysDollars = (traditionalBalance * (1 - (retirementTaxRate / 100))) / inflationFactor;
    const rothValueTodaysDollars = rothBalance / inflationFactor;

    // 5. The "Nest Egg (Today's $)" is the sum of the true purchasing power of both buckets.
    const finalNestEggTodaysDollars = traditionalValueTodaysDollars + rothValueTodaysDollars;
    
    // The 4% rule for income is based on this realistic, spendable amount.
    const monthlyRetirementIncome = (finalNestEggTodaysDollars * 0.04) / 12;

    return { finalNestEggFutureDollars, finalNestEggTodaysDollars, monthlyRetirementIncome, chartData };
}

export function formatCurrency(num, digits = 0) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits }).format(num);
}
