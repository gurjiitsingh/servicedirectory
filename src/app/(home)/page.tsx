import React, { Suspense } from 'react'
import PageComponent from './pageComponent'

export default function Page() {
  return (
    <Suspense>
    <PageComponent />
    </Suspense>
  )
}
