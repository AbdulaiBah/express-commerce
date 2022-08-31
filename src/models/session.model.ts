import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface UserSessionDocument extends mongoose.Document {
    user: UserDocument['_id']
    valid: boolean
    createdAt: Date
    updatedAt: Date
}

const userSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})


const UserSessionModel = mongoose.model<UserSessionDocument>('UserSession', userSessionSchema)

export default UserSessionModel