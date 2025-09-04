/**
 * Root Layout Component
 * 
 * Provides the base HTML structure and global providers for the application.
 * Wraps all pages with Auth0 provider for authentication context.
 */

import './globals.css';
import type { Metadata } from 'next';
import { Auth0Provider } from '@auth0/nextjs-auth0';

export const metadata: Metadata = {
  title: 'Secure Notes App',
  description: 'A secure note-taking application built with Next.js, Auth0, and MongoDB',
  keywords: ['nextjs', 'auth0', 'mongodb', 'notes', 'secure'],
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        {/* Auth0 Provider for client-side authentication context */}
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
