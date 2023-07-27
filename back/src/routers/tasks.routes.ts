import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { taskSchemaRequest, taskSchemaUpdate } from "../schemas/tasks.schema";
import { createTaskController, deleteTaskController, listTaskController, updateTaskController } from "../controllers/tasks.controller";
import { ensureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

const tasksRoutes = Router()

tasksRoutes.post("", ensureAuthMiddleware, ensureDataIsValid(taskSchemaRequest), createTaskController)
tasksRoutes.get("", ensureAuthMiddleware, listTaskController)
tasksRoutes.patch("", ensureAuthMiddleware, ensureIsOwnerMiddleware, ensureDataIsValid(taskSchemaUpdate), updateTaskController)
tasksRoutes.delete("", ensureAuthMiddleware, ensureIsOwnerMiddleware, deleteTaskController)


export { tasksRoutes }