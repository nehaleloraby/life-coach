import express from 'express'
import { Book } from '../models/sources.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const bookRoutes = express.Router()

// Route to get all books
bookRoutes.route('/').get(async (req, res) => {
    try {
        const books = await Book.find({})
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to add a new book - Protected Admin Route
bookRoutes.route('/').post(verifyAdmin, async (req, res) => {
    try {
        const newBook = new Book(req.body)
        await newBook.save()
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to update a book by ID - Protected Admin Route
bookRoutes.route('/:id').put(verifyAdmin, async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Route to delete a book by ID - Protected Admin Route
bookRoutes.route('/:id').delete(verifyAdmin, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.json({ message: "Book deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default bookRoutes


