import express from 'express'
import FullSession from '../models/fullSession.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const router = express.Router()

// Route to create a new full session (Admin)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { title, description, duration, price, platform, timezone } = req.body

        const newSession = new FullSession({
            title,
            description,
            duration,
            price,
            platform,
            timezone,
            availableSlots: [] 
        })

        await newSession.save()
        res.status(201).json(newSession)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to get all full sessions
router.get('/', async (req, res) => {
    try {
        const fullSessions = await FullSession.find()
        res.json(fullSessions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to get available slots for full sessions
router.get('/available-slots', async (req, res) => {
    try {
        const { date } = req.query
        let query = {}

        if (date) {
            const selectedDate = new Date(date)
            query['availableSlots.date'] = {
                $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
                $lte: new Date(selectedDate.setHours(23, 59, 59, 999))
            }
        }

        const sessions = await FullSession.find(query).where("availableSlots.times.isBooked").equals(false)
        res.json(sessions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to book a specific full session slot
router.put('/:id/book', async (req, res) => {
    try {
        const { slotDate, slotTime, userInfo } = req.body
        const fullSession = await FullSession.findById(req.params.id)

        if (!fullSession) {
            return res.status(404).json({ message: 'Full session not found' })
        }

        const slot = fullSession.availableSlots.find(slot => slot.date.toISOString() === slotDate)
                         .times.find(time => time.time === slotTime)

        if (!slot || slot.isBooked) {
            return res.status(400).json({ message: 'Slot not available' })
        }

        slot.isBooked = true
        slot.userInfo = userInfo
        await fullSession.save()

        res.json({ message: 'Full session booked successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Admin route to update Full Session content
router.put('/admin/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params
    const { title, price, duration, platform, timezone, description } = req.body.adminContent

    try {
        const updatedSession = await FullSession.findByIdAndUpdate(
            id, 
            { adminContent: { title, price, duration, platform, timezone, description } },
            { new: true }
        )
        res.json(updatedSession)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Admin route to delete a specific Full Session
router.delete('/admin/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params

    try {
        const result = await FullSession.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Full session not found' })
        }
        res.json({ message: 'Full session deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router





