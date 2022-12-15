import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import 'dotenv/config'
import { IUserLogin } from '../interfaces/users'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'

export const loginService = async ( { email, password }: IUserLogin ): Promise<Array<number | object>> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneByOrFail({
        email: email
    })
    if(!user){
        return [403, {message: "User or password invalid"}]
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        return [403,  {message: "User or password invalid"}]
    }

    const token = jwt.sign(
        {
            isAdm:user.isAdm,
            email: user.email
        },
        process.env.SECRET_KEY,
        {
            subject: String(user.id), 
            expiresIn: '24h'
        }
    )


    return [200, {token: token}]

}
