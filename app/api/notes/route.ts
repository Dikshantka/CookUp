
/**
 * Notes API Routes
 * 
 * Handles CRUD operations for user notes with authentication.
 * All operations require a valid user session.
 */

import clientPromise from "../../lib/mongodb";
import { NextRequest } from "next/server";

// Use Node.js runtime for MongoDB operations
export const runtime = "nodejs";

/**
 * Utility function to extract user data from session cookie
 */
function getUserFromRequest(request: NextRequest) {
  const userCookie = request.cookies.get('auth-user');
  if (!userCookie) return null;
  
  try {
    return JSON.parse(userCookie.value);
  } catch (error) {
    console.error('Session parsing error:', error);
    return null;
  }
}

/**
 * GET /api/notes
 * 
 * Retrieves all notes for the authenticated user.
 * Returns notes sorted by creation date (newest first).
 */
export async function GET(req: Request) {
  const nextReq = new NextRequest(req);
  const user = getUserFromRequest(nextReq);
  
  if (!user) {
    return new Response("Unauthorized - Please log in", { status: 401 });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("secure-app");
    const notes = db.collection("notes");

    // Fetch notes only for the authenticated user
    const docs = await notes
      .find({ userId: user.sub }) // Filter by user ID for security
      .sort({ _id: -1 }) // Sort by newest first
      .limit(50) // Limit results for performance
      .toArray();

    return new Response(JSON.stringify(docs), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response("Database error", { status: 500 });
  }
}

/**
 * POST /api/notes
 * 
 * Creates a new note for the authenticated user.
 * Expects JSON body with 'text' field.
 */
export async function POST(req: Request) {
  // Clone request to avoid stream consumption issues
  const reqClone = req.clone();
  
  const nextReq = new NextRequest(req);
  const user = getUserFromRequest(nextReq);
  
  if (!user) {
    return new Response("Unauthorized - Please log in", { status: 401 });
  }

  // Validate content type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(
      JSON.stringify({ error: "Content-Type must be application/json" }), 
      {
        status: 415,
        headers: { "content-type": "application/json" },
      }
    );
  }

  try {
    // Parse request body
    const body = await reqClone.json();

    // Validate required fields
    if (!body?.text || typeof body.text !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'text' field" }), 
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    // Connect to MongoDB and insert note
    const client = await clientPromise;
    const db = client.db("secure-app");
    const notes = db.collection("notes");

    const result = await notes.insertOne({
      userId: user.sub, // Associate with authenticated user
      text: body.text.trim(),
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ insertedId: result.insertedId }), 
      {
        status: 201,
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error('Database or parsing error:', error);
    return new Response(
      JSON.stringify({ error: "Failed to create note" }), 
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}