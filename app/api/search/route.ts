import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  if (!query || query.trim().length === 0) {
    return Response.json({ results: [], error: 'No search query provided' }, { status: 400 })
  }

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    const searchTerm = `%${query.toLowerCase()}%`

    const [{ data: labs = [], error: labsError }, { data: packages = [], error: packagesError }] = await Promise.all([
      supabase
        .from('labs')
        .select('*')
        .or(
          `name.ilike.${searchTerm},address.ilike.${searchTerm},city.ilike.${searchTerm}`
        )
        .limit(50),
      supabase
        .from('test_packages')
        .select('*')
        .or(`name.ilike.${searchTerm},category.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(50),
    ])

    if (labsError) {
      console.error('[v0] Labs search error:', labsError)
    }
    if (packagesError) {
      console.error('[v0] Packages search error:', packagesError)
    }

    const results = [
      ...(labs || []).map((lab: any) => ({ 
        ...lab, 
        type: 'lab',
        original_price: lab.original_price,
        originalPrice: lab.original_price
      })),
      ...(packages || []).map((pkg: any) => ({ 
        ...pkg, 
        type: 'package',
        original_price: pkg.original_price,
        originalPrice: pkg.original_price
      })),
    ]

    console.log('[v0] Search results:', { query, labsCount: labs?.length || 0, packagesCount: packages?.length || 0, totalResults: results.length })

    return Response.json({ results, count: results.length })
  } catch (error) {
    console.error('[v0] Search API error:', error)
    return Response.json(
      { results: [], error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}
