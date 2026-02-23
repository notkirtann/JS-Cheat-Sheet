import express from "express";
import auth from "../middleware/auth.js";
import taskRoute from "../controllers/task.controller.js";
import { validate } from "../middleware/validate.js";
import { taskValidationSchema} from "../utils/validSchema.js";

const router = express.Router();

router
  .route("/")
  .post(auth,validate(taskValidationSchema), taskRoute.createTask)
  .get(auth, taskRoute.getAllTasks);

router
  .route("/:id")
  .get(auth, taskRoute.getTaskById)
  .patch(auth, taskRoute.updateTaskById)
  .delete(auth, taskRoute.deleteTask);

export default router;