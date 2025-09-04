/**
 * Auth0 Configuration
 * 
 * Configures the Auth0 client for server-side operations.
 * This setup is primarily used for middleware and server-side session management.
 * 
 * Note: In this implementation, we use manual OAuth2 flow in the API routes
 * rather than the Auth0 SDK's built-in handlers for better control.
 */

import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  secret: process.env.AUTH0_SECRET!,
  appBaseUrl: process.env.AUTH0_BASE_URL!,
});