import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16+ Proxy (formerly Middleware)
 * Handles route protection and redirects.
 */
export async function proxy(request: NextRequest) {
  // BYPASS TOTAL DE L'AUTHENTIFICATION POUR LA DEMO SHOWROOM
  // En production, nous utiliserions Supabase Auth ici.
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
