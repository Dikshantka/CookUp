export default async function HomePage() {
  // Optional: read the session server-side
  // const session = await auth0.getSession();

  return (
    <main>
      <h1>Secure App</h1>
      <p>Auth0 + Next.js v4 middleware flow</p>

      <p>
 <a href="/auth/login">Log in</a>
<a href="/auth/logout">Log out</a>
</p>
<p style={{ marginTop: 20 }}>
  After logging in, try <a href="/auth/profile" target="_blank" rel="noreferrer">/auth/profile</a>.
</p>
    </main>
  );
}

