import { app } from "./app.js"

async function startServer() {
    try {
        const server = app.listen(3000, () => {
            console.log("Server is running on port 3000")
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