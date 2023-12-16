import { initMongoose } from "../lib/mongoosey.js";
import Product from "../models/product.js";

export default async function handle(req, res) {
    await initMongoose();
    res.json(await Product.find().exec()) ;
}