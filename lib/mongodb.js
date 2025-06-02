import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error('Missing MONGODB_URI in environment variables');
if (!dbName) throw new Error('Missing MONGODB_DB in environment variables');

let client;
let db;

export async function connectToDatabase() {
  if (db) return { client, db };

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db(dbName);
  return { client, db };
}