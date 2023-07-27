import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interface";
import { hash } from "bcryptjs"
import { userSchemaResponse } from "../../schemas/users.schema";


const createUserService = async (data: TUserRequest): Promise<TUserResponse> => {
    const { email, name, password } = data
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOne({
        where: {
            email
        }
    })
    if(findUser){
        throw new AppError("user already exists", 409)
    }

    const hashedPassword = await hash(password, 10)
    const user = userRepository.create({
        name,
        email,
        password: hashedPassword
    })

    await userRepository.save(user)

    return userSchemaResponse.parse(user)
}


export { createUserService }