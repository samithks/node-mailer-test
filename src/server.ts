require("dotenv").config();
import { createServer } from 'http'
import app from './app'
import { AppDataSource } from './connection/data-source'

async function main() {
    try {
        const PORT = process.env.PORT || 3000
        const server = createServer(app)
        // Initalize data source
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
        // Initalize the server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error)
        throw error
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})