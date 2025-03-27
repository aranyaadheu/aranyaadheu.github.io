'use client'

import { useState } from 'react'

interface CounterProps {
  initialCount?: number
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  return (
    <div className="flex flex-col items-center p-4 my-6 border rounded-lg bg-muted/50">
      <h3 className="text-xl font-bold mb-2">Interactive Counter</h3>
      <p className="text-3xl font-bold mb-4">{count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(initialCount)}
          className="px-4 py-2 bg-muted-foreground/10 hover:bg-muted-foreground/20 text-muted-foreground rounded-lg transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
        >
          Increase
        </button>
      </div>
    </div>
  )
} 