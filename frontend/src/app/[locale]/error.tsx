'use client'
import { ErrorContent } from '@/components/ui/error-content'
import { ErrorProps } from '@/types/components'


/* Component for handling errors */
export default function Error({ error, reset }: ErrorProps) {
  return <ErrorContent error={error} reset={reset} />
}