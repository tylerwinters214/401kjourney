export const ContributionMode = { Percentage: 'Percentage', FixedAmount: 'FixedAmount' }
export const SalaryIncreaseType = { Percentage: 'Percentage', Dollar: '$' }
export const ContributionType = { Traditional: 'Traditional', Roth: 'Roth' }

export const DEFAULT_INPUTS = {
    currentAge: 30, 
    retirementAge: 65, 
    annualIncome: 75000, 
    currentSavings: 50000,
    currentSavingsTraditionalPercentage: 60, 
    contributionValue: 15, 
    contributionMode: ContributionMode.Percentage,
    salaryIncreaseValue: 2, 
    salaryIncreaseType: SalaryIncreaseType.Percentage, 
    contributionType: ContributionType.Traditional,
    rateOfReturn: 7, 
    inflationRate: 3, 
    retirementTaxRate: 15,
}

export const AFFILIATE_LINKS = {
    roboAdvisors: [
        // { name: "SoFi", url: "https://www.sofi.com/invite/invest?gcp=9cb7cad9-8ed5-453a-b360-f876cf8f1e56&isAliasGcp=false", description: "Get $25 worth of your favorite stock when you invest $25." },
        // { name: "Betterment", url: "#", description: "Personalized investment portfolios." }
    ],
    savingsAccounts: [
        { name: "Investing", url: "https://www.sofi.com/invite/invest?gcp=9cb7cad9-8ed5-453a-b360-f876cf8f1e56&isAliasGcp=false", description: "Get $25 worth of your favorite stock when you invest $25 with SoFi." },
        { name: "High-Yield Checking and Savings", url: "https://www.sofi.com/invite/money?gcp=b5999dc3-fb24-4085-be60-6691271d1bd1&isAliasGcp=false", description: "Get up to $325 and a 6-month APY boost with SoFi." },
    ],
    books: [
        { name: "The Total Money Makeover Updated and Expanded: A Proven Plan for Financial Peace", url: "https://www.amazon.com/Total-Money-Makeover-Updated-Expanded/dp/140034252X?crid=KTE0WO0VJ8BI&dib=eyJ2IjoiMSJ9.flUMnCIJIRB0qq-4-fzZ7xEpUDPxI9BdFVbbFU59j1l88VWA4_VcTo6T37bF4gtM6n1pD6Ai2vJcNVm_666XaXAF3PJitf0Of3_Pgra-WxQv-imhy97Ufot6K6gJp-4sVjVLyqTjHS70FRqMGHatuPHCvAhON957dcSVP3ydYOQhv8UNiFsCpcYfiaVvR-6kZA6yzTD4EV_aSdDj38eStGnljImXdlxkTQq39SbYruk.tubPgCiVLTJoEZa4herMHLuksNgoHPkMnWIOVdpOfMs&dib_tag=se&keywords=dave+ramsey+investing+for+beginners&qid=1755290568&sprefix=dave+ramsey+invest%2Caps%2C224&sr=8-4&linkCode=ll1&tag=tjw0ee-20&linkId=3ca81baad12d1d38ddd687d7f0dac981&language=en_US&ref_=as_li_ss_tl", description: "Dave Ramsey's proven plan for financial peace by becoming debt free." },
        { name: "Dave Ramsey's Complete Guide To Money", url: "https://www.amazon.com/Dave-Ramseys-Complete-Guide-Money-ebook/dp/B00L5X8W3I?dib=eyJ2IjoiMSJ9.r3GFb7leJp6kTYv_1mA8K37DL2uL7wkQQcgRCSjuOxnYNr-KQRg3egNFxajKat5GxqnKlpI1_NxNbndnOX69Mn-lkU9_X07aEqlwU-I2Ungshq9eERsCZzUGqRHiWP9AObW58U3x90UpBSx3skSnkCwHp9wonvx4oofrSHG9Fjs_F0Z2XNQAZD87btq7JMTyCpJ2x2L5Me_pT2EB3XYRjuBqNh_Hv9_1yDLrgIjwpJw.2PaJe0dnNeDipWBBh6YP1JhO-rT5yb_p5-GaDuTbV1Y&dib_tag=AUTHOR&linkCode=ll1&tag=tjw0ee-20&linkId=e64a6d8d25c1e27a971e6621fc483acd&language=en_US&ref_=as_li_ss_tl", description: "Dave Ramsey's Complete Guide to Money offers the ultra-practical way to learn how money works." }
    ]
}
