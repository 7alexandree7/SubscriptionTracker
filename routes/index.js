import { Router } from "express"
import testRouter from "./test.routes.js"
import userRouter from "./user.routes.js"
import authRouter from "./auth.routes.js"
import subscriptionRouter from "./subscription.routes.js"

const router = Router();

router.use("/test", testRouter)
router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/subscriptions", subscriptionRouter)

export default router;
