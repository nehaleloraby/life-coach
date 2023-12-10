import express from 'express'
import { Podcast } from '../models/sources.js'

const podcastRoutes = express.Router()

// Route to get all podcasts
podcastRoutes.route('/').get(async (req, res) => {
    try {
        const podcasts = await Podcast.find({})
        res.json(podcasts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to add a new podcast
podcastRoutes.route('/').post(async (req, res) => {
    try {
        const newPodcast = new Podcast(req.body)
        await newPodcast.save()
        res.status(201).json(newPodcast)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to update a podcast by ID
podcastRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedPodcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedPodcast) {
            return res.status(404).json({ message: "Podcast not found" })
        }
        res.json(updatedPodcast)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to delete a podcast by ID
podcastRoutes.route('/:id').delete(async (req, res) => {
    try {
        const podcast = await Podcast.findByIdAndDelete(req.params.id)
        if (!podcast) {
            return res.status(404).json({ message: "Podcast not found" })
        }
        res.json({ message: "Podcast deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default podcastRoutes






