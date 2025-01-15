'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const HydrationWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <>{children}</>
}

const VisioGenEditor = dynamic(() => import('./main_page/page'), {
  ssr: false,
})

export default function Page() {
  return (
    <HydrationWrapper>
      <VisioGenEditor />
    </HydrationWrapper>
  )
}