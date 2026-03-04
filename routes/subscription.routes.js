import { Router } from "express"
import {
    createSubscription,
    getSubscriptions,
    getAllSubscriptions,
    getSubscriptionsDetails,
    updateSubscription,
    deleteSubscription
} from "../Controllers/subscription.controller.js"
import authorize from "../middlewares/auth.middleware.js"

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize, createSubscription)
subscriptionRouter.get("/user/:id", authorize, getSubscriptions)
subscriptionRouter.get("/all", authorize, getAllSubscriptions)
subscriptionRouter.get("/details/:id", authorize, getSubscriptionsDetails)
subscriptionRouter.put("/:id", authorize, updateSubscription)
subscriptionRouter.delete("/:id", authorize, deleteSubscription)

export default subscriptionRouter;