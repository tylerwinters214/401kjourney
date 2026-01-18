import { NextResponse } from 'next/server'

export async function GET() {
  const hasApiKey = !!process.env.GEMINI_API_KEY
  return NextResponse.json({
    status: 'ok',
    hasApiKey: hasApiKey,
    message: hasApiKey 
      ? 'API key is configured' 
      : 'WARNING: GEMINI_API_KEY is not set in environment variables'
  })
}
