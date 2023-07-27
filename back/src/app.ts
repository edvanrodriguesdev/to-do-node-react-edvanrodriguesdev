import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleAppError } from "./middlewares/handleAppError.middleware"
import { userRoutes } from "./routers/users.routes"
import { loginRoutes } from "./routers/login.routes"
import { tasksRoutes } from "./routers/tasks.routes"


const app = express()

app.use(express.json())
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/tasks", tasksRoutes)
app.use(handleAppError)


export default app