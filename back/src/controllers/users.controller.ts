import { Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";



const createUserController = async(req: Request, res: Response) => {

    const newUser = await createUserService(req.body)

    return res.status(201).json(newUser)
}


export { createUserController }