/**
 * Next.js Middleware
 * 
 * Handles request interception and routing logic.
 * Currently configured for basic request passthrough, but can be extended
 * to add authentication checks, redirects, or other request processing.
 */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Allow all Auth0 authentication routes to pass through
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  
  // Add any additional middleware logic here
  // Examples: authentication checks, redirects, header modifications
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};