import { Router } from "express"
import { createSubscription, getSubscriptions, getAllSubscriptions } from "../Controllers/subscription.controller.js"
import authorize from "../middlewares/auth.middleware.js"

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize ,createSubscription)
subscriptionRouter.get("/user/:id", authorize, getSubscriptions)
subscriptionRouter.get("/all", authorize, getAllSubscriptions)

export default subscriptionRouter;