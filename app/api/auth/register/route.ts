import { NextRequest, NextResponse } from 'next/server';

/**
 * Custom Registration API using Auth0 Management API
 * Creates new users directly in Auth0 database
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Get Auth0 Management API token
    const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
    });

    if (!tokenResponse.ok) {
      console.error('Failed to get Auth0 management token');
      return NextResponse.json(
        { error: 'Registration service unavailable' },
        { status: 500 }
      );
    }

    const { access_token } = await tokenResponse.json();

    // Create user in Auth0
    const createUserResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        email,
        password,
        connection: 'Username-Password-Authentication',
        email_verified: false,
        app_metadata: {
          created_via: 'custom_registration'
        },
        user_metadata: {
          signup_source: 'secure_notes_app'
        }
      })
    });

    const userData = await createUserResponse.json();

    if (!createUserResponse.ok) {
      // Handle specific Auth0 errors
      if (userData.code === 'user_exists') {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }
      
      console.error('Auth0 user creation failed:', userData);
      return NextResponse.json(
        { error: userData.message || 'Registration failed' },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now log in.',
      user_id: userData.user_id
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
