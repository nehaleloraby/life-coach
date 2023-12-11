import express from 'express'
import FullSession from '../models/fullSession.js'

const router = express.Router()

// Route to get all full sessions
router.get('/', async (req, res) => {
    try {
        const fullSessions = await FullSession.find()
        res.json(fullSessions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to create a new full session 
router.post('/', async (req, res) => {
    const fullSession = new FullSession({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price,
        platform: req.body.platform,
        timezone: req.body.timezone,
        availableSlots: req.body.availableSlots
    })

    try {
        const newFullSession = await fullSession.save()
        res.status(201).json(newFullSession)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to book a full session slot
router.put('/:id/book', async (req, res) => {
    try {
        const { slotIndex, timeIndex, userInfo } = req.body
        const fullSession = await FullSession.findById(req.params.id)

        if (!fullSession) {
            return res.status(404).json({ message: 'Full session not found' })
        }

        fullSession.availableSlots[slotIndex].times[timeIndex].isBooked = true
        fullSession.userInfo = userInfo
        await fullSession.save()

        res.json(fullSession)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router
