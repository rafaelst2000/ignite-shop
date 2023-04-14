import { useLayoutEffect, useState } from 'react'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('mobile')

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)')
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      setBreakpoint(event.matches ? 'mobile' : 'desktop')
    }
    mobileQuery.addEventListener('change', handleBreakpointChange)
    return () => {
      mobileQuery.removeEventListener('change', handleBreakpointChange)
    }
  }, [])

  return breakpoint
}
