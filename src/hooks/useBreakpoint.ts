import { useState, useEffect, useRef } from 'react'

export function useBreakpoint() {
  const [windowWidth, setWindowWidth] = useState(0)
  const breakpoint = windowWidth < 768 ? 'mobile' : 'desktop'
  const initialViewport = useRef(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  function handleResize() {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      setWindowWidth(initialViewport.current)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return breakpoint
}
