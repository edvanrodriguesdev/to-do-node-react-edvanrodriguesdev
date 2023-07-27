import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entitie";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors";
import { TTaskRequest, TTaskResponse } from "../../interfaces/tasks.interfaces";
import { taskSchema } from "../../schemas/tasks.schema";


const createTaskService = async (data: TTaskRequest, userId: string): Promise<TTaskResponse> => {
    const taskRepository = AppDataSource.getRepository(Task)

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new AppError("user not found", 404)
    }

    const task = taskRepository.create({
        ...data,
        user
    })

    await taskRepository.save(task)

    return taskSchema.parse(task)
}


export { createTaskService }