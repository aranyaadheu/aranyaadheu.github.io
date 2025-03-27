'use client'

import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'
import '../app/styles/prism-custom.css'
// Core languages
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
// Additional languages
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
// Plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

interface CodeSampleProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: string
}

export function CodeSample({ 
  children, 
  language = 'typescript', 
  filename,
  showLineNumbers = true,
  highlightLines
}: CodeSampleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [children])

  const preClasses = [
    'p-4 overflow-x-auto text-sm',
    !filename ? 'rounded-t-lg' : '',
    showLineNumbers ? 'line-numbers' : '',
  ].filter(Boolean).join(' ')

  const preAttributes = {
    className: preClasses,
    ...(highlightLines ? { 'data-line': highlightLines } : {})
  }

  return (
    <div className="rounded-lg overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
          <div className="text-sm text-gray-700 dark:text-gray-200 font-mono">{filename}</div>
          <button
            onClick={copyToClipboard}
            className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre {...preAttributes}>
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  )
} 