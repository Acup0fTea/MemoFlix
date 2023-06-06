import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "message",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      sender: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      recipient: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    modelOptions
  )
);
