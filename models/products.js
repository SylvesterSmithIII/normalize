import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: String,
        price: String,
        images: {
            type: [String],
            required: true
        },
        type: String,
        printifyId: String,
        StripeId: String,
        variants: [{
            id: Number,
            title: String,
            price: Number,
            tags: [String]
        }],
      }, {
        timestamps: true
      }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
