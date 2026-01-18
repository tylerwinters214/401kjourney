import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '401k Journey - Retirement Calculator with AI Insights',
  description: 'Project your financial future with our free retirement calculator. Get personalized AI-powered insights to help you reach your retirement goals. Calculate your 401k growth, estimate retirement income, and plan for the future.',
  keywords: '401k calculator, retirement calculator, retirement planning, financial planning, AI retirement advice, 401k journey',
  authors: [{ name: '401k Journey' }],
  openGraph: {
    title: '401k Journey - Retirement Calculator with AI Insights',
    description: 'Project your financial future with our free retirement calculator. Get personalized AI-powered insights.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '401k Journey - Retirement Calculator',
    description: 'Project your financial future with our free retirement calculator.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-19PVNLG7CM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-19PVNLG7CM');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900`}>
        {children}
      </body>
    </html>
  )
}
