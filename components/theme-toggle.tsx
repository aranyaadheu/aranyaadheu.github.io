'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Icons } from '@/components/ui/icons'

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const root = window.document.documentElement
    const isDarkStored = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkStored)
    
    if (isDarkStored) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('darkMode', String(newIsDark))
    
    if (newIsDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ scale: [0.8, 1], rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Icons.moon className="w-5 h-5" />
        ) : (
          <Icons.sun className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  )
} 