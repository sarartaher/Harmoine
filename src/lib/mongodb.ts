import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("MONGO_URI is missing");
}

if (!dbName) {
  throw new Error("DB_NAME is missing");
}

export const client = new MongoClient(uri);
export const db = client.db(dbName);
