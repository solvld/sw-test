'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
