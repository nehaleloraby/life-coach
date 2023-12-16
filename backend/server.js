import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDb from './database.js'
import videoRoutes from './routes/videoRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import podcastRoutes from './routes/podcastRoutes.js'
import discoveryRoutes from './routes/discoveryRoutes.js'
import fullSessRoutes from './routes/fullSessRoutes.js'
import homePageRoutes from './routes/homePageRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

// Connecting to MongoDB
connectToDb()

// Initializing Express App
const app = express()

// Parsing json bodies using express.json()
app.use(express.json())

// Enabling cors
app.use(cors())

// Routes 
app.use('/', homePageRoutes)
app.use('/videos', videoRoutes)
app.use('/books', bookRoutes)
app.use('/podcasts', podcastRoutes)
app.use('/discovery-calls', discoveryRoutes)
app.use('/full-sessions', fullSessRoutes)
app.use('/admin', adminRoutes)


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`)
})

