import app from "./app.js"
import { PORT } from "./config/env.js"
import connectToDataBase from "./database/connect.js"

async function startServer() {
    try {
        await connectToDataBase()
        console.log("Connected to the database successfully.")
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

        server.on("error", (error) => {
            console.error("Error starting server:", error)
            process.exit(1)
        })
    }

    catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}

startServer()