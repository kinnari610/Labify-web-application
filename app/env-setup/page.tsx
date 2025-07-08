import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EnvSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Environment Setup</h1>
          <p className="text-gray-600">Configure your Labify application</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            The application is currently running in demo mode. To enable full functionality, please set up your
            environment variables.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Required Environment Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Supabase Configuration</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-white px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>
                  <p className="text-gray-600 mt-1">Your Supabase project URL</p>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                  <p className="text-gray-600 mt-1">Your Supabase anonymous key</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Demo Credentials</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Email:</strong> <code>demo@labify.com</code>
                </div>
                <div>
                  <strong>Password:</strong> <code>demo123</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Create a Supabase Project</h4>
                  <p className="text-gray-600 text-sm">
                    Go to{" "}
                    <Link
                      href="https://supabase.com"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      supabase.com <ExternalLink className="w-3 h-3" />
                    </Link>{" "}
                    and create a new project
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Run Database Scripts</h4>
                  <p className="text-gray-600 text-sm">
                    Execute the SQL scripts in the scripts folder to set up your database
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Configure Environment Variables</h4>
                  <p className="text-gray-600 text-sm">
                    Add your Supabase URL and anon key to your environment variables
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Restart the Application</h4>
                  <p className="text-gray-600 text-sm">Restart your development server to apply the changes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue with Demo Mode
          </Link>
        </div>
      </div>
    </div>
  )
}
