import mongoose from "mongoose"

const WorkSchema = new mongoose.Schema(
    {
        company: {
            type: 'String',
            required: true
        },
        period: {
            type: 'String',
            required: true
        },
        location: {
            type: 'String',
            required: true
        },
        description: {
            type: 'String',
            required: true
        }
    }
)

export default mongoose.model('Work', WorkSchema)