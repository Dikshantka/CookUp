import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MongoClient } from 'mongodb';

declare global {
  // Allow global variable to persist across module reloads in development
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('auth-user');
  if (!userCookie) {
    redirect('/api/auth/login?returnTo=/admin');
    return null;
  }
  const user = JSON.parse(userCookie.value);
  // Only allow admin users (example: check email)
  if (user.email !== 'admin@cookup.com') {
    return <div>Access denied. Admins only.</div>;
  }
  // Fetch all recipes for admin review
  const client = await clientPromise;
  const db = client.db();
  const recipes = await db.collection('recipes').find({}).toArray();
  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {recipes.map((recipe: any) => (
          <div key={recipe._id.toString()} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #eee', padding: 24 }}>
            <h2 style={{ marginBottom: 8 }}>{recipe.title}</h2>
            <p style={{ marginBottom: 12 }}>{recipe.description}</p>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>By: {recipe.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
