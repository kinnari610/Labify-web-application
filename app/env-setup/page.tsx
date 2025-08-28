"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Copy, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EnvCheck {
  name: string
  key: string
  required: boolean
  present: boolean
  value?: string
  description: string
}

export default function EnvSetupPage() {
  const [envChecks, setEnvChecks] = useState<EnvCheck[]>([])
  const [showValues, setShowValues] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checks: EnvCheck[] = [
      {
        name: "Supabase URL",
        key: "NEXT_PUBLIC_SUPABASE_URL",
        required: true,
        present: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        value: process.env.NEXT_PUBLIC_SUPABASE_URL,
        description: "Your Supabase project URL",
      },
      {
        name: "Supabase Anon Key",
        key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        required: true,
        present: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        description: "Supabase anonymous/public key",
      },
      {
        name: "Supabase Service Role Key",
        key: "SUPABASE_SERVICE_ROLE_KEY",
        required: true,
        present: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        value: process.env.SUPABASE_SERVICE_ROLE_KEY,
        description: "Supabase service role key (server-side only)",
      },
    ]

    setEnvChecks(checks)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Environment variable copied to clipboard",
    })
  }

  const allRequired = envChecks.filter((check) => check.required)
  const missingRequired = allRequired.filter((check) => !check.present)
  const isSetupComplete = missingRequired.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Environment Setup</h1>
          <p className="text-gray-600">Configure your environment variables for Labify</p>
        </div>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isSetupComplete ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              )}
              Setup Status
            </CardTitle>
            <CardDescription>
              {isSetupComplete
                ? "All required environment variables are configured!"
                : `${missingRequired.length} required environment variable(s) missing`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSetupComplete && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please configure the missing environment variables to enable full functionality.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Current configuration status</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowValues(!showValues)}>
                {showValues ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showValues ? "Hide Values" : "Show Values"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {envChecks.map((check) => (
                <div key={check.key} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{check.name}</h3>
                        {check.required && <Badge variant="secondary">Required</Badge>}
                        {check.present ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{check.key}</code>
                      {showValues && check.value && (
                        <div className="mt-2 flex items-center gap-2">
                          <code className="text-xs bg-blue-50 px-2 py-1 rounded flex-1 truncate">
                            {check.value.substring(0, 50)}...
                          </code>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(check.value!)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>How to configure your environment variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Supabase Configuration</h4>
              <p className="text-sm text-gray-600">Go to your Supabase project dashboard and copy the following:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside ml-4 space-y-1">
                <li>Project URL → NEXT_PUBLIC_SUPABASE_URL</li>
                <li>Project API Keys → anon/public → NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                <li>Project API Keys → service_role → SUPABASE_SERVICE_ROLE_KEY</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Google OAuth Setup</h4>
              <p className="text-sm text-gray-600">In your Supabase Auth settings, configure Google OAuth:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside ml-4 space-y-1">
                <li>Enable Google provider in Authentication → Providers</li>
                <li>
                  Add your domain to Site URL: <code>https://your-domain.com</code>
                </li>
                <li>
                  Add callback URL: <code>https://your-domain.com/auth/callback</code>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Environment File</h4>
              <p className="text-sm text-gray-600">
                Create a <code>.env.local</code> file in your project root:
              </p>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.reload()}>Refresh Status</Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
