import clientPromise from '../../lib/mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NewRecipePage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('auth-user');
  if (!userCookie) {
    redirect('/api/auth/login');
    return null;
  }
  const user = JSON.parse(userCookie.value);

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const author = user.name;
    const client = await clientPromise;
    const db = client.db();
    await db.collection('recipes').insertOne({ title, description, author });
    redirect('/recipes');
  }

  return (
    <main>
      <h1>Post a New Recipe</h1>
      <form action={handleSubmit} method="post">
        <input name="title" placeholder="Recipe Title" required />
        <textarea name="description" placeholder="Recipe Description" required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
