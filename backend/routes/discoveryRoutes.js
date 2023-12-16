import express from 'express'
import DiscoveryCall from '../models/discoveryCall.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const router = express.Router()

// Route to get all discovery call sessions
router.get('/', async (req, res) => {
    try {
        const discoveryCalls = await DiscoveryCall.find()
        res.json(discoveryCalls)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to get available slots for discovery calls
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
        const calls = await DiscoveryCall.find(query).where("availableSlots.times.isBooked").equals(false)
        res.json(calls)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to book a specific discovery call slot
router.put('/:id/book', async (req, res) => {
    try {
        const { slotDate, slotTime, userInfo } = req.body
        const discoveryCall = await DiscoveryCall.findById(req.params.id)
        if (!discoveryCall) {
            return res.status(404).json({ message: 'Discovery call not found' })
        }
        const slot = discoveryCall.availableSlots.find(slot => slot.date.toISOString() === slotDate)
                         .times.find(time => time.time === slotTime)
        if (!slot || slot.isBooked) {
            return res.status(400).json({ message: 'Slot not available' })
        }
        slot.isBooked = true
        slot.userInfo = userInfo
        await discoveryCall.save()
        res.json({ message: 'Discovery call booked successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// PUT route for updating Discovery Call admin content
router.put('/admin/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, duration, platform, timezone } = req.body.adminContent
        const updatedCall = await DiscoveryCall.findByIdAndUpdate(
            id, 
            { "adminContent": { title, description, price, duration, platform, timezone } },
            { new: true }
        )
        res.json(updatedCall)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// POST route to create a new discovery call session (Admin)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { title, description, duration, price, platform, timezone } = req.body
        const newCall = new DiscoveryCall({
            title,
            description,
            duration,
            price,
            platform,
            timezone,
            availableSlots: [] 
        })
        await newCall.save()
        res.status(201).json(newCall)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE route to delete a specific discovery call session (Admin)
router.delete('/admin/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const result = await DiscoveryCall.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Discovery call not found' })
        }
        res.json({ message: 'Discovery call deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router



