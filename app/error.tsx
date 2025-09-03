"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service if desired
    // eslint-disable-next-line no-console
    console.error("App error boundary:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-4 text-center">
            <h1 className="text-xl font-bold">Something went wrong</h1>
            <p className="text-sm text-gray-600">
              A client-side exception occurred. Try reloading the page or going back home.
            </p>
            {error?.message && (
              <pre className="text-left text-xs bg-gray-50 p-3 rounded border overflow-auto max-h-48">
                {error.message}
              </pre>
            )}
            <div className="flex gap-2 justify-center">
              <Button onClick={() => reset()}>Reload</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
