import Link from 'next/link';
import { MongoClient } from 'mongodb';
import { cookies } from 'next/headers';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secureapp';

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const _client = new MongoClient(uri);

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = _client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  clientPromise = _client.connect();
}

export default async function RecipesPage() {
  // Extract user session from cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('auth-user');
  if (!userCookie) {
    return <div>Please <Link href="/api/auth/login">log in</Link> to view recipes.</div>;
  }

  // Fetch recipes from MongoDB
  const client = await clientPromise;
  const db = client.db();
  const recipes = await db.collection('recipes').find({}).toArray();

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>CookUp Recipes</h1>
      <div style={{ textAlign: 'right', marginBottom: 24 }}>
        <Link href="/recipes/new" style={{ background: '#0070f3', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold' }}>Post a Recipe</Link>
      </div>
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
