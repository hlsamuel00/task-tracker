import { Schema, Model } from "mongoose"

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
    }
})

export default Model('Task', TaskSchema)

