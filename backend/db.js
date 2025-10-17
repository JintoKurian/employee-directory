import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

export async function connectDB() {
  await client.connect();
  db = client.db("employeeDirectory");
  console.log("Connected to MongoDB");
}

export function getDB() {
  return db;
}