import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)
export interface ProductDocument extends mongoose.Document {
    productId: string
    title: string
    inStock: Boolean
    sellerName: string
    sellerStatus: Array<string>
    price: number
    createdOn: Date
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`
    },
    title: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerStatus: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)

export default ProductModel