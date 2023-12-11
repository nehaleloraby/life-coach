import express from 'express'
import DiscoveryCall from '../models/discoveryCall.js'

const router = express.Router()

// Route to get all the discovery call sessions
router.get('/', async (req, res) => {
    try {
        const discoveryCalls = await DiscoveryCall.find()
        res.json(discoveryCalls)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to create a new discovery call session 
router.post('/', async (req, res) => {
    const discoveryCall = new DiscoveryCall({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price,
        platform: req.body.platform,
        timezone: req.body.timezone,
        availableSlots: req.body.availableSlots
    })

    try {
        const newDiscoveryCall = await discoveryCall.save()
        res.status(201).json(newDiscoveryCall)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to book a specific discovery call 
router.put('/:id/book', async (req, res) => {
    try {
        const { slotIndex, timeIndex, userInfo } = req.body
        const discoveryCall = await DiscoveryCall.findById(req.params.id)

        if (!discoveryCall) {
            return res.status(404).json({ message: 'Discovery call not found' })
        }

        discoveryCall.availableSlots[slotIndex].times[timeIndex].isBooked = true
        discoveryCall.userInfo = userInfo
        await discoveryCall.save()

        res.json(discoveryCall)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router

