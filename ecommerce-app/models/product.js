import {model, models, Schema} from "mongoose"

const ProductSchema = new Schema(definition, {
    name: String,
    description: String,
    price: Number,
    category: String,
    picture: String,
});

const Product = models?.Product || model(name, 'Product', ProductSchema)

export default Product