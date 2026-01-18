import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request) {
  try {
    const { inputs, results } = await request.json()

    // Validate required data
    if (!inputs || !results) {
      return NextResponse.json(
        { error: 'Missing required data: inputs and results are required' },
        { status: 400 }
      )
    }

    // Get API key from environment variable (secure on server side)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      console.error('ERROR: GEMINI_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error: GEMINI_API_KEY not found. Please check your .env.local file and restart the server.' },
        { status: 500 }
      )
    }

    // Log API key status (first few chars only for security)
    console.log('Has GEMINI_API_KEY:', !!process.env.GEMINI_API_KEY)

    // Create the prompt
    const prompt = `You are a helpful and encouraging financial coach. Analyze the following retirement projection and provide personalized, actionable advice. Keep the tone positive and focus on 3-4 key takeaways. Format the output using markdown, including bullet points for recommendations. Do not use headings.
            User's Inputs:
            - Current Age: ${inputs.currentAge}, Retirement Age: ${inputs.retirementAge}
            - Annual Income: $${inputs.annualIncome.toLocaleString()}
            - Current Savings: $${inputs.currentSavings.toLocaleString()}
            - Contribution: ${inputs.contributionMode === 'Percentage' ? `${inputs.contributionValue}%` : `$${inputs.contributionValue}/month`} (${inputs.contributionType})
            Projected Results:
            - Future Nest Egg: $${results.finalNestEggFutureDollars.toLocaleString(undefined, {maximumFractionDigits: 0})}
            - Nest Egg (in today's dollars): $${results.finalNestEggTodaysDollars.toLocaleString(undefined, {maximumFractionDigits: 0})}
            - Estimated Monthly Retirement Income (after-tax, today's dollars): $${results.monthlyRetirementIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}
            Based on this, what is your advice? Please refer to the larger "Future Nest Egg" value in your opening sentence, but frame the core of your advice around the "today's dollars" value, as that represents real purchasing power.`

    // Initialize Gemini AI
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.trim())
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Generate content
    console.log('Calling Gemini API...')
    const result = await model.generateContent(prompt)
    const advice = result.response.text()
    
    if (!advice) {
      throw new Error('Empty response from Gemini API')
    }
    
    return NextResponse.json({ advice })
    } catch (apiError) {
      // Re-throw with more context
      console.error('Gemini API Error:', apiError)
      throw apiError
    }
  } catch (error) {
    console.error('Error generating advice:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      cause: error?.cause
    })
    
    // Handle specific error cases
    if (error && error.message && error.message.includes('[503')) {
      return NextResponse.json(
        { error: "Sorry, the AI service is currently experiencing very high demand. Please try again in a few minutes." },
        { status: 503 }
      )
    }

    // Handle API key errors - check various error formats from Gemini API
    const errorMsgLower = error?.message?.toLowerCase() || ''
    const errorString = JSON.stringify(error).toLowerCase()
    
    if (
      errorMsgLower.includes('api_key') || 
      errorMsgLower.includes('api key') || 
      errorMsgLower.includes('authentication') ||
      errorMsgLower.includes('invalid api key') ||
      errorMsgLower.includes('unauthorized') ||
      errorMsgLower.includes('403') ||
      errorString.includes('api_key') ||
      errorString.includes('authentication')
    ) {
      console.error('API Key Error:', error.message)
      console.error('Full error:', error)
      return NextResponse.json(
        { error: 'Server configuration error: GEMINI_API_KEY not found. Set it in Netlify Site settings → Environment variables, then redeploy.' },
        { status: 500 }
      )
    }

    // Handle quota/rate limit errors
    const msg = (error?.message || '').toLowerCase()
    const status = error?.status || error?.response?.status
    if (status === 429 || msg.includes('quota') || msg.includes('rate limit')) {
      return NextResponse.json({ error: "API quota exceeded. Please try again later." }, { status: 429 })
    }
    if (error?.message?.includes('quota') || error?.message?.includes('429')) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      )
    }

    // Return more detailed error in development, generic in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    const errorMessage = isDevelopment 
      ? `Error: ${error?.message || 'Unknown error'}`
      : "Sorry, I couldn't fetch advice right now. Please try again later."

    // Generic error response
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
