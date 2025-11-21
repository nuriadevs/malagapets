'use client'

import { useState, useLayoutEffect } from 'react'

/**
 * Timestamp component.
 * @returns {number | null} 
 */
export function Timestamp() {
  const [time, setTime] = useState<number | null>(null)
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date().getFullYear())
  }, [])
  if (time) {
    return time
  }
  return null
}