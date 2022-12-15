import "express-async-errors"
import { errorHandler } from './errors/errorHandler';
import { loginRoutes } from './routers/login.router';
import "reflect-metadata"
import express from "express"
import userRoutes from "./routers/users.router"



const app = express()
app.use(express.json())
app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use(errorHandler)
export default app