import express from 'express'
import { Video } from '../models/sources.js'

const videoRoutes = express.Router()

// Route to get all videos
videoRoutes.route('/').get(async (req, res) => {
    try {
        const videos = await Video.find({})
        res.json(videos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to add a new video
videoRoutes.route('/').post(async (req, res) => {
    try {
        const newVideo = new Video(req.body)
        await newVideo.save()
        res.status(201).json(newVideo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to update a video
videoRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" })
        }
        res.json(updatedVideo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to delete a video
videoRoutes.route('/:id').delete(async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id)
        if (!video) {
            return res.status(404).json({ message: "Video not found" })
        }
        res.json({ message: "Video deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default videoRoutes