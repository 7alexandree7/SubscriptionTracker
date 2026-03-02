import { Router } from "express";
import { getUserById, getUsers } from "../Controllers/use.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/:id", authorize, getUserById)



export default userRouter;