# 401k Journey - Next.js App

A retirement calculator app built with Next.js, featuring AI-powered financial advice with **optimized SEO and performance**.

## Architecture

This app uses **Next.js** with:
- **Server-Side Rendering (SSR)**: Better SEO and faster initial page loads
- **API Routes**: Secure backend API for Gemini AI (API key never exposed to client)
- **Static Optimization**: Automatic code splitting and performance optimizations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local and add your Gemini API key
```

3. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
```

**Important**: The API key is stored server-side only and is **never exposed** to the client.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes (secure backend)
│   │   └── advice/        # Gemini API proxy
│   ├── layout.jsx          # Root layout with SEO metadata
│   ├── page.jsx           # Home page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── InputPanel.jsx
│   ├── ResultsPanel.jsx
│   ├── GeminiCoach.jsx
│   ├── AffiliatePanel.jsx
│   └── InfoPanel.jsx
├── utils/                  # Utility functions
│   ├── calculations.js
│   └── constants.js
├── public/                 # Static assets
└── next.config.js          # Next.js configuration
```

## SEO & Performance Features

✅ **Server-Side Rendering**: Content is rendered on the server for better SEO  
✅ **Optimized Metadata**: Comprehensive meta tags for search engines  
✅ **Fast Initial Load**: HTML delivered immediately, no client-side rendering delay  
✅ **Automatic Code Splitting**: Only load what's needed  
✅ **Image Optimization**: Built-in Next.js image optimization (when using images)  
✅ **API Route Security**: API key stays on server, never exposed to browser

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

Next.js is optimized for Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add `GEMINI_API_KEY` to environment variables
4. Deploy!

### Other Platforms

Next.js can be deployed to:
- **Vercel** (recommended - zero config)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Any Node.js hosting** (requires `npm run build && npm start`)

## Features

- Retirement savings calculator
- Real-time projections with charts
- AI-powered financial advice (using Google Gemini via secure API routes)
- Responsive design with dark mode support
- Traditional and Roth 401k calculations
- **Optimized for SEO and performance**

## Security

✅ **API Key Security**: The Gemini API key is stored in `.env.local` and is **never exposed** to the client.  
✅ **Server-Side Only**: API routes run on the server, keeping secrets secure.  
✅ **Environment Variables**: Use `.env.local` for local development (not committed to git).

## Notes

- All functionality has been preserved from the original app
- Chart.js is integrated via `react-chartjs-2`
- Tailwind CSS is configured for styling
- Dark mode is supported via the `dark` class
