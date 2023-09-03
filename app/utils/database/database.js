// Next.js에서 mongoDB연결
import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://thdud2262:OT5uGxvUb5ZuUBvj@database.fslqrua.mongodb.net/?retryWrites=true&w=majority";
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
