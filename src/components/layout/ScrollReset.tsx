'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function ScrollReset() {
  const pathname = usePathname()

  useIsomorphicLayoutEffect(() => {
    if (pathname !== '/') {
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.height = ''
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
