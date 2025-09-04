/**
 * User Profile API Route
 * 
 * Returns the authenticated user's profile information.
 * Requires a valid session cookie to access.
 */

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Extract user session from HTTP-only cookie
  const userCookie = request.cookies.get('auth-user');
  
  if (!userCookie) {
    return new Response('Unauthorized - No session found', { status: 401 });
  }

  try {
    // Parse user data from cookie
    const user = JSON.parse(userCookie.value);
    
    // Return user profile information
    return Response.json(user);
  } catch (error) {
    console.error('Session parsing error:', error);
    return new Response('Invalid session data', { status: 401 });
  }
}
