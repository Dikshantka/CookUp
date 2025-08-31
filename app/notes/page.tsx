// This file now only contains the server-side logic and imports NotesClient from its own file.

// app/notes/page.tsx
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import NotesClient from "./NotesClient";

export default async function NotesPage() {
  // Server-side session check
  const session = await auth0.getSession();
  if (!session) {
    // Send the user to Auth0 login and return to /notes afterwards
    redirect("/auth/login?returnTo=/notes");
  }
  return <NotesClient />;
}
