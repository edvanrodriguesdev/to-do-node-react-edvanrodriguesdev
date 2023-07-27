import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entitie";


const ensureIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const taskRepository = AppDataSource.getRepository(Task)

    const taskId = req.params.id
    const userId = res.locals.userId

    const task = await taskRepository.findOne({
        where: {
            id: taskId
        },
        relations: {
            user: true
        }
    })

    if(!task) {
        res.status(404).json({
            message: "task not found"
        })
    }

    if(task?.user.id !== userId) {
        res.status(403).json({
            message: "you don`t have permissions"
        })
    }

    return next()
}


export { ensureIsOwnerMiddleware }