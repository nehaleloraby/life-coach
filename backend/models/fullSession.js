import mongoose from 'mongoose'

const fullSessionSchema = new mongoose.Schema({
    title: String, // Admin edit content
    description: String, 
    duration: Number, 
    price: Number, 
    platform: String, 
    timezone: String, 
    availableSlots: [{
        date: Date,
        times: [{
            time: String,
            isBooked: {
                type: Boolean,
                default: false
            },
            userInfo: {  // store user information when they book
                name: String,
                email: String,
                phone: String,
                notes: String
            }
        }]
    }],
    // Admin edit content
    adminContent: {
        title: String,
        description: String,
        price: Number,
        duration: Number,
        platform: String,
        timezone: String
    }
})

const FullSession = mongoose.model('FullSession', fullSessionSchema)

export default FullSession



