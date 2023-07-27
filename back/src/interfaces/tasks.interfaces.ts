import { z } from "zod"
import { taskSchema, taskSchemaRequest, tasksSchemaResponse } from "../schemas/tasks.schema"
import { DeepPartial } from "typeorm"


type TTaskRequest = z.infer<typeof taskSchemaRequest>
type TTask = z.infer<typeof taskSchema>
type TTaskResponse = z.infer<typeof taskSchema>
type TTasksResponse = z.infer<typeof tasksSchemaResponse>
type TTaskUpdate = DeepPartial<TTaskRequest>


export { TTaskRequest, TTask, TTaskResponse, TTasksResponse, TTaskUpdate }