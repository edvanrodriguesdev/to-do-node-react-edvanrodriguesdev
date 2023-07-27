import { Request, Response } from "express";
import { TTasksResponse } from "../../interfaces/tasks.interfaces";
import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entitie";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors";
import { tasksSchemaResponse } from "../../schemas/tasks.schema";


const listTasksService = async (userId: string): Promise<TTasksResponse> => {
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

    const tasks = await taskRepository.find({
        where: {
            user: user
        }
    })

    return tasksSchemaResponse.parse(tasks)
}


export { listTasksService }