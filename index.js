// import module
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { bootStrap } from './src/bootStrap.js'

// create server
const app = express()
const port = process.env.port || 3000


// dotenv
dotenv.config({ path: path.resolve('./config/.env')})

// connect db
connectDB()

// bootStrap
bootStrap(app, express)

// listen
app.listen(port, () => {
    console.log("server is running on port", port);
})