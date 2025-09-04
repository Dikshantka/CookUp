/**
 * Auth0 Logout Route Handler
 * 
 * This endpoint handles user logout by clearing the local session cookie
 * and redirecting to Auth0's logout endpoint to complete the logout process.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  // Build Auth0 logout URL with return parameters
  const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?` +
    new URLSearchParams({
      returnTo: process.env.AUTH0_BASE_URL!, // Where to redirect after logout
      client_id: process.env.AUTH0_CLIENT_ID!, // Required for logout
    }).toString();
  
  // Create redirect response to Auth0 logout
  const response = NextResponse.redirect(logoutUrl);
  
  // Clear the local session cookie to ensure complete logout
  response.cookies.delete('auth-user');
  
  return response;
}
