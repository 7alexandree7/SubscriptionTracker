import app from "./app.js"
import { PORT } from "./config/env.js"

async function startServer() {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

        server.on("error", (error) => {
            console.error("Error starting server:", error)
            process.exit(1)
        })
    }

    catch (error) {
        console.error("Unexpected error:", error)
        process.exit(1)
    }
}

startServer()