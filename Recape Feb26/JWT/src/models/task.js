import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

taskSchema.index({ ownerId: 1, completed: 1 });
taskSchema.index({ ownerId: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
