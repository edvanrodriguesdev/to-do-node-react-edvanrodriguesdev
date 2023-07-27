import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entitie";
import { AppError } from "../../errors";
import { TTaskResponse, TTaskUpdate } from "../../interfaces/tasks.interfaces";
import { taskSchema } from "../../schemas/tasks.schema";


const updateTaskService = async (data: TTaskUpdate, taskId: string): Promise<TTaskResponse> => {
    const taskRepository = AppDataSource.getRepository(Task)
    const oldTask = await taskRepository.findOneBy({id: taskId})

    if(!oldTask) {
        throw new AppError("task not found", 404)
    }

    const newTaskData = taskRepository.create({
        ...oldTask,
        ...data
    })

    await taskRepository.save(newTaskData)

    return taskSchema.parse(newTaskData)
}


export { updateTaskService }