import { z } from "zod"
import { TaskStatus } from "../entities/task.entitie"


const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(TaskStatus)
})

const taskSchemaRequest = taskSchema.omit({
    id: true
})

const taskSchemaUpdate = taskSchema.omit({
    id: true
}).partial()

const tasksSchemaResponse = z.array(taskSchema)


export { taskSchema, taskSchemaRequest, taskSchemaUpdate, tasksSchemaResponse }