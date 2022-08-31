import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'
import { UserDocument } from './user.model'
import { ProductDocument } from './product.model'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)
export interface OrderDocument extends mongoose.Document {
    orderId: string
    status: string
    value: number
    createdBy: UserDocument['_id']
    products: Array<Map<ProductDocument['productId'], number>>
    createdOn: Date
}

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: () => `order_${nanoid()}`
    },
    status: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model<OrderDocument>('Project', orderSchema)

export default OrderModel