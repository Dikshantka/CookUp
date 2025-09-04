/**
 * MongoDB Connection Handler
 * 
 * Provides a singleton MongoDB client that efficiently manages
 * database connections across the application lifecycle.
 */

import { MongoClient } from "mongodb";

// Extract MongoDB URI from environment variables
const uri = process.env.MONGODB_URI!;
const options = {};

// Type declarations for the MongoDB client
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Validate that MongoDB URI is configured
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

// Global type declaration for development hot reload support
declare global {
  // Allow global variable to persist client across hot reloads in development
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * In development mode, use a global variable to preserve the MongoDB connection
 * across module reloads caused by HMR (Hot Module Replacement).
 * 
 * In production, create a new client for each serverless function invocation.
 */
if (process.env.NODE_ENV === "development") {
  // Use existing global connection or create a new one
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the promise that resolves to the MongoDB client
export default clientPromise;