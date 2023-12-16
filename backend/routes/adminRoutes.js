import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import verifyAdmin from '../middleware/authMiddleware.js'

const SECRET_KEY = 'secretkey'
const router = express.Router()

// Admin Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body

        // Checking if the admin already exists
        const existingAdmin = await Admin.findOne({ username })
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' })
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creating a new admin user
        const admin = new Admin({
            username,
            password: hashedPassword,
            isAdmin: true
        })

        // Saving the new admin user
        await admin.save()

        // Responding with a success message
        res.status(201).json({ message: 'Admin created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin' })
    }
})

// Admin Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        // Fetching the admin user from the database
        const admin = await Admin.findOne({ username, isAdmin: true })

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Comparing the typed password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // If info is valid, creating and getting the token
        const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY)
        res.json({ message: 'Admin Login successful', token })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
})

// Update Admin Information - Protected Admin Route
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const { username, password } = req.body
        let updatedAdmin = null

        if (username) {
            updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, { username }, { new: true })
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true })
        }

        if (updatedAdmin) {
            res.json(updatedAdmin)
        } else {
            res.status(400).json({ error: "No changes were made" })
        }
    } catch (error) {
        res.status(500).json({ error: `Error updating admin: ${error.message}` })
    }
})

export default router
