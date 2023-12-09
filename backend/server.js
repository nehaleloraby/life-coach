import dotenv from 'dotenv'
dotenv.config()
import database from './database.js'
import express from 'express'

// Routes

database()
const app = express()

app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString()
    },
    limit: '50mb'
})
)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`)
})
