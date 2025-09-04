/**
 * Auth0 Login Route Handler
 * 
 * This endpoint initiates the Auth0 authentication flow by redirecting
 * users to the Auth0 login page with proper OAuth2 parameters.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Extract returnTo parameter for post-login redirect
  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/';
  
  // Build Auth0 authorization URL with OAuth2 parameters
  const authUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/authorize`);
  authUrl.searchParams.set('response_type', 'code'); // OAuth2 authorization code flow
  authUrl.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', `${process.env.AUTH0_BASE_URL}/api/auth/callback`);
  authUrl.searchParams.set('scope', 'openid profile email'); // Request user profile info
  
  // Encode returnTo URL in state parameter for security
  authUrl.searchParams.set('state', Buffer.from(JSON.stringify({ returnTo })).toString('base64'));
  
  // Redirect user to Auth0 login page
  return NextResponse.redirect(authUrl.toString());
}
