import { model, Schema } from "mongoose";

const todoSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
})

export const Todo = model("Todo", todoSchema);