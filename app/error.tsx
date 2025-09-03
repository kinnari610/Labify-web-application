"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    // Log so we can see the root cause in the console
    // eslint-disable-next-line no-console
    console.error("App Error Boundary:", error)
  }, [error])

  const handleTryAgain = () => {
    try {
      if (typeof reset === "function") {
        reset()
      } else if (typeof window !== "undefined") {
        // Fallback when reset isn't provided by the runtime
        window.location.reload()
      }
    } catch {
      if (typeof window !== "undefined") window.location.reload()
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-gray-600">A client-side exception occurred. Try again or go back home.</p>

        {error?.message && (
          <details className="text-left text-xs bg-gray-50 p-3 rounded border max-h-48 overflow-auto">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <pre className="whitespace-pre-wrap">{error.message}</pre>
            {error.digest ? <div className="mt-2 text-[10px] text-gray-500">Digest: {error.digest}</div> : null}
          </details>
        )}

        <div className="flex gap-2 justify-center">
          <Button onClick={handleTryAgain}>Try again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
