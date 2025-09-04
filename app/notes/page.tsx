/**
 * Notes Page - Server Component
 * 
 * Protected page that requires authentication to access.
 * Performs server-side session validation before rendering the client component.
 */

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import NotesClient from "./NotesClient";

export default async function NotesPage() {
  // Server-side authentication check using session cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('auth-user');
  
  // Redirect to login if no valid session found
  if (!userCookie) {
    // Include returnTo parameter to redirect back after login
    redirect("/api/auth/login?returnTo=/notes");
  }
  
  // Render the client-side notes interface for authenticated users
  return <NotesClient />;
}
