import express from 'express'
import About from '../models/about.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const router = express.Router()

// Route to get "About" page information (Public View)
router.get('/', async (req, res) => {
    try {
        const aboutInfo = await About.findOne()
        res.json(aboutInfo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to update "About" page information (Protected-Admin)
router.put('/', verifyAdmin, async (req, res) => { 
    try {
        const updatedInfo = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true })
        res.json(updatedInfo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router
