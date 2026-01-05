import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://admin:nakaharachuuya@cluster0.abwu6eh.mongodb.net/adminDashboard?retryWrites=true&w=majority&appName=Cluster0";


if (!MONGODB_URI) throw new Error("Missing MongoDB URI");

let cached = (global as any).mongoose;

if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
