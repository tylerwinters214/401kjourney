import React from 'react'

function GeminiCoach({ advice, isLoading, onGetAdvice }) {
  const formatAdvice = (text) => {
    if (!text) return ''

    // First, handle bolding, which is simple.
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    const lines = boldedText.split('\n')
    let html = ''
    let inList = false // State to track if we're inside a <ul>

    for (const line of lines) {
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        // This line IS a list item.
        if (!inList) {
          // If we're not already in a list, start one.
          html += '<ul class="list-disc space-y-2 my-4 pl-4">'
          inList = true
        }
        // Add the list item.
        html += `<li>${trimmedLine.substring(2)}</li>`
      } else {
        // This line is NOT a list item.
        // **THE KEY FIX IS HERE:** Only act if the line is not empty.
        if (trimmedLine.length > 0) {
          if (inList) {
            // If we were in a list, this non-empty line ends it.
            html += '</ul>'
            inList = false
          }
          // Add the line as a paragraph.
          html += `<p class="mb-2">${trimmedLine}</p>`
        }
        // If the line is blank, we do nothing, preserving the 'inList' state.
      }
    }

    // After the loop, if we were still in a list, close the final tag.
    if (inList) {
      html += '</ul>'
    }

    return html
  }

  let content = ''
  if (isLoading) {
    content = (
      <div className="flex items-center text-slate-600 dark:text-slate-300">
        <svg className="animate-spin mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Thinking...
      </div>
    )
  } else if (advice) {
    content = (
      <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: formatAdvice(advice) }} />
    )
  } else {
    content = (
      <>
        <p className="text-slate-600 dark:text-slate-300 mb-4">See how you're doing and get personalized tips to help you reach your retirement goals.</p>
        <button 
          onClick={onGetAdvice}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get AI Advice
        </button>
      </>
    )
  }

  return (
    <div className="mt-8 p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">AI Retirement Coach</h2>
      </div>
      {content}
    </div>
  )
}

export default GeminiCoach
