import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './database.js'
import videoRoutes from './routes/videoRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import podcastRoutes from './routes/podcastRoutes.js'
import discoveryRoutes from './routes/discoveryRoutes.js'
import fullSessRoutes from './routes/fullSessRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js'


dotenv.config()

// Connecting to MongoDB
connectToDb()

// Initializing Express App
const app = express()

// Parsing json bodies using express.json()
app.use(express.json())

// Routes 
app.use('/videos', videoRoutes)
app.use('/books', bookRoutes)
app.use('/podcasts', podcastRoutes)
app.use('/discovery-calls', discoveryRoutes)
app.use('/full-sessions', fullSessRoutes)
app.use('/about', aboutRoutes)


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`)
})

