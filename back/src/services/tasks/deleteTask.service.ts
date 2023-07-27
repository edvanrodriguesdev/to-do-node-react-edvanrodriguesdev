import { AppDataSource } from "../../data-source"
import { Task } from "../../entities/task.entitie"
import { AppError } from "../../errors"



const deleteTaskService = async (taskId: string): Promise<void> => {
    const taskRepository = AppDataSource.getRepository(Task)
    const task = await taskRepository.findOneBy({id: taskId})

    if(!task) {
        throw new AppError("task not found", 404)
    }

    await taskRepository.remove(task)
}


export { deleteTaskService }