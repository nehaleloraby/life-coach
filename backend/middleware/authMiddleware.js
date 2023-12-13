import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'

const verifyAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Access Denied' })

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        const admin = await Admin.findById(verified.adminId)
        if (!admin || !admin.isAdmin) {
            return res.status(401).json({ message: 'Access Denied' })
        }
        req.admin = admin
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' })
    }
}

export default verifyAdmin


