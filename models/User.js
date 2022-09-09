import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: 'String',
            required: true,
            unique: true
        },
        password: {
            type: 'String',
            required: true,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        works: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Works'
        }],
        role: {
            type: String,
            default: "USER"
        }
    },
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)