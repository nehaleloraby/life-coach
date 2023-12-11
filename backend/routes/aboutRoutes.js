import express from 'express'
import About from '../models/about.js'

const router = express.Router()

// Route to get "About" page information
router.get('/', async (req, res) => {
    try {
        const aboutInfo = await About.findOne()
        res.json(aboutInfo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to update "About" page information
router.put('/', async (req, res) => {
    try {
        const updatedInfo = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true })
        res.json(updatedInfo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router
