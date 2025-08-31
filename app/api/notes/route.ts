
// Update the import path if your mongodb file is located elsewhere, e.g. "../../lib/mongodb"
import clientPromise from "../../lib/mongodb";
import { auth0 } from "@/lib/auth0";   
import { encryptText, decryptText } from "@/lib/crypto";


export const runtime = "nodejs";

// GET /api/notes -> only return current user's notes
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  const nextReq = new NextRequest(req);
  const session = await auth0.getSession(nextReq);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const client = await clientPromise;
  const db = client.db("secure-app");
  const notes = db.collection("notes");

  const docs = await notes
    .find({ userId: session.user.sub })   // only this user's notes
    .sort({ _id: -1 })
    .limit(50)
    .toArray();

  return new Response(JSON.stringify(docs), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  // clone BEFORE anything else may consume the body
  const reqClone = req.clone();

  const nextReq = new NextRequest(req);
  const session = await auth0.getSession(nextReq);
  if (!session) return new Response("Unauthorized", { status: 401 });

  // (optional) quick content-type guard
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), {
      status: 415,
      headers: { "content-type": "application/json" },
    });
  }

  // read from the clone so the stream is fresh
  const body = await reqClone.json();

  if (!body?.text || typeof body.text !== "string") {
    return new Response(JSON.stringify({ error: "Missing 'text'" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const client = await clientPromise;
  const db = client.db("secure-app");
  const notes = db.collection("notes");

  const result = await notes.insertOne({
    userId: session.user.sub,
    text: body.text.trim(),
    createdAt: new Date(),
  });

  return new Response(JSON.stringify({ insertedId: result.insertedId }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
}