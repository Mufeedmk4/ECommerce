import mongoose from "mongoose";
const defaultMongoDDBUrl = 'mongodb+srv://mufeedkamal:1AxzukgqzmWAaln2@cluster0.vxa2kca.mongodb.net/ecommerce?retryWrites=true&w=majority'
export const dynamic = 'force-dynamic'
export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(process.env.MONGODB_URL || defaultMongoDDBUrl);
}