import aj from "../config/arcjet.js"

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1})

        if (decision.isDenied()) {

            const isRateLimit = decision.reason.isRateLimit()
            const isBot = decision.reason.isBot()
            const status = isRateLimit ? 429 : 403
            let message = "Access denied."

            if (isRateLimit) {
                message = "Too many requests. Please try again later."
            }

            if (isBot) {
                message = "Bot traffic is not allowed."
            }
            
            return res.status(status).json({ error: message })
        }
        next()
    }

    catch (error) {
        console.error("Error in Arcjet middleware:", error)
        return res.status(500).json({ error: "Internal server error." })
    }
}

export default arcjetMiddleware