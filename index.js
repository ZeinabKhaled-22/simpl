// import module
import express from 'express'
import { connectDB } from './db/connection.js'
import { bootStrap } from './src/bootStrap.js'

// create server
const app = express()
const port = 3000

// connect db
connectDB()

// bootStrap
bootStrap(app, express)

// listen
app.listen(port, () => {
    console.log("server is running on port", port);
})