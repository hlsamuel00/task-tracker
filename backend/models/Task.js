import { Schema, model } from "mongoose"

const TaskSchema = new Schema({
    text: {
        type: String, 
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    reminder:{
        type: Boolean,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default model('Task', TaskSchema)

