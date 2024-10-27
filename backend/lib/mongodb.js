// lib/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("RuleEngine"); // Replace with your actual database name
  }
  return db;
}
