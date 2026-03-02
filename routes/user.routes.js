import { Router } from "express";
import { getUserById, getUsers } from "../Controllers/use.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)



export default userRouter;