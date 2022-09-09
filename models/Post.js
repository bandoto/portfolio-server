import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        github: {
            type: String
        },
        link: {
            type: String
        },
        imgUrl: {
            type: String,
            required: true,
            default: ''
        },
        views: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, 
    { timestamps: true }
)

export default mongoose.model('Post', PostSchema)
