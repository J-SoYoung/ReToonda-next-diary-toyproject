// Next.js에서 mongoDB연결
import { MongoClient } from "mongodb";

// mongoDB connect => vscode용 연결
const url =
  "mongodb+srv://thdud2262:j01022624479@database.fslqrua.mongodb.net/";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
