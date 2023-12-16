import express from 'express'
import HomePage from '../models/homePage.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const router = express.Router()

// Route to get home page info
router.get('/', async (req, res) => {
    try {
        const homeInfo = await HomePage.findOne()
        res.json(homeInfo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to update home page information (Admin)
router.put('/', verifyAdmin, async (req, res) => {
    try {
        const updatedInfo = await HomePage.findOneAndUpdate({}, req.body, { new: true, upsert: true })
        res.json(updatedInfo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router

