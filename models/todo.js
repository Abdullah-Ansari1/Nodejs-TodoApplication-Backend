import mongoose  from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum : ['PENDING','COMPLETED','DELAYED'],
        default: "PENDING"
    },
    due_Date: {
        type: Date,
        required: true,
    }

}, { timestamps: true });

var Todo = mongoose.model('Todo', todoSchema);

export default Todo;