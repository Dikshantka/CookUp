/**
 * Auth0 Login Route Handler
 * 
 * This endpoint initiates the Auth0 authentication flow by redirecting
 * users to the Auth0 login page with proper OAuth2 parameters.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simple color helpers for terminal logs
  const color = {
    green: (t: string) => `\x1b[32m${t}\x1b[0m`,
    yellow: (t: string) => `\x1b[33m${t}\x1b[0m`,
    red: (t: string) => `\x1b[31m${t}\x1b[0m`,
    cyan: (t: string) => `\x1b[36m${t}\x1b[0m`,
  };
  console.log(color.cyan(`[auth/login] Incoming request: ${request.nextUrl.pathname}${request.nextUrl.search}`));

  // Validate required environment variables early to surface config issues clearly
  const missingEnv: string[] = [];
  if (!process.env.AUTH0_DOMAIN) missingEnv.push('AUTH0_DOMAIN');
  if (!process.env.AUTH0_CLIENT_ID) missingEnv.push('AUTH0_CLIENT_ID');
  if (!process.env.AUTH0_BASE_URL) missingEnv.push('AUTH0_BASE_URL');
  if (missingEnv.length > 0) {
    console.error(color.red(`[auth/login] Missing env vars: ${missingEnv.join(', ')}`));
    return NextResponse.json(
      {
        error: 'Missing environment variables',
        details: {
          missing: missingEnv,
          hint:
            'Create a .env.local with AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_BASE_URL, AUTH0_SECRET. Ensure Allowed Callback URLs in Auth0 includes <BASE_URL>/api/auth/callback.'
          
        }
      },
      { status: 500 }
    );
  }

  // Extract parameters
  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/';
  const connection = request.nextUrl.searchParams.get('connection'); // Social provider
  const screenHint = request.nextUrl.searchParams.get('screen_hint'); // signup or login
  console.log(color.yellow(`[auth/login] Params → connection=${connection || 'none'}, screen_hint=${screenHint || 'none'}, returnTo=${returnTo}`));
  
  // Build Auth0 authorization URL with OAuth2 parameters
  const authUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/authorize`);
  authUrl.searchParams.set('response_type', 'code'); // OAuth2 authorization code flow
  authUrl.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', `${process.env.AUTH0_BASE_URL}/api/auth/callback`);
  authUrl.searchParams.set('scope', 'openid profile email'); // Request user profile info
  
  // Add social connection if specified (Google, Facebook, GitHub, etc.)
  if (connection) {
    authUrl.searchParams.set('connection', connection);
  }
  
  // Add screen hint for signup vs login
  if (screenHint) {
    authUrl.searchParams.set('screen_hint', screenHint);
  }
  
  // Encode returnTo URL in state parameter for security
  authUrl.searchParams.set('state', Buffer.from(JSON.stringify({ returnTo })).toString('base64'));
  
  // Redirect user to Auth0 login page (or social provider)
  const redirectTo = authUrl.toString();
  console.log(color.green(`[auth/login] Redirecting to Auth0: ${redirectTo.replace(/client_id=.*?(&|$)/, 'client_id=***$1')}`));
  return NextResponse.redirect(redirectTo);
}
