/**
 * Auth0 Callback Route Handler
 * 
 * This endpoint handles the OAuth2 callback from Auth0 after user authentication.
 * It exchanges the authorization code for tokens, retrieves user information,
 * and establishes a secure session using HTTP-only cookies.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get('code'); // Authorization code from Auth0
  const state = url.searchParams.get('state'); // State parameter for security
  
  // Validate that we received an authorization code
  if (!code) {
    console.error('No authorization code received from Auth0');
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  try {
    // Step 1: Exchange authorization code for access tokens
    const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        code,
        redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokens);
      return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
    }

    // Step 2: Get user profile information using access token
    const userResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const user = await userResponse.json();
    
    if (!userResponse.ok) {
      console.error('User info retrieval failed:', user);
      return NextResponse.redirect(new URL('/?error=user_failed', request.url));
    }

    // Step 3: Parse state parameter to get original returnTo URL
    let returnTo = '/';
    if (state) {
      try {
        const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
        returnTo = stateData.returnTo || '/';
      } catch (e) {
        console.error('State parsing failed:', e);
      }
    }

    // Step 4: Create secure session cookie with user information
    const response = NextResponse.redirect(new URL(returnTo, request.url));
    
    // Store essential user data in HTTP-only cookie for security
    response.cookies.set('auth-user', JSON.stringify({
      sub: user.sub, // Unique user identifier
      name: user.name,
      email: user.email,
      picture: user.picture
    }), {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    });

    return response;
    
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
}
