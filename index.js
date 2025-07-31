import express from 'express'
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { router } from "./routes/routes.js"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(router)

// Levanta o server
app.listen(8000, subirApp)
function subirApp() {
    console.log("Aplicação levantada com sucesso...")
}

export {__dirname}
