import { MongoClient } from "mongodb";

// Get MongoDB details from .env.local
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Check whether the required environment variables exist
if (!uri) {
  throw new Error("MONGO_URI is missing from .env.local");
}

if (!dbName) {
  throw new Error("DB_NAME is missing from .env.local");
}

// Create MongoDB connection
const client = new MongoClient(uri);

// Select our existing database
export const db = client.db(dbName);
