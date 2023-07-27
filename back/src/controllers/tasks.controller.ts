import { Request, Response } from "express";
import { TTaskResponse } from "../interfaces/tasks.interfaces";
import { createTaskService } from "../services/tasks/createTask.service";
import { listTasksService } from "../services/tasks/listTask.service";
import { updateTaskService } from "../services/tasks/updateTask.service";
import { deleteTaskService } from "../services/tasks/deleteTask.service";


const createTaskController = async (req: Request, res: Response): Promise<any> => {
    const userId = res.locals.userId
    const newTask = await createTaskService(req.body, userId)

    return res.status(201).json(newTask)
}

const listTaskController = async (req: Request, res: Response): Promise<any> => {
    const userId = res.locals.userId
    const tasks = await listTasksService(userId)

    return res.json(tasks)
}

const updateTaskController = async (req: Request, res: Response): Promise<any> => {
    const updateTask = await updateTaskService(req.body, req.params.id)

    return res.json(updateTask)
}

const deleteTaskController = async (req: Request, res: Response): Promise<any> => {
    await deleteTaskService(req.params.id)

    return res.status(204).send()
}


export { createTaskController, listTaskController, updateTaskController, deleteTaskController }