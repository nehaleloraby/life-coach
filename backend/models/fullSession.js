import mongoose from 'mongoose'

const fullSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true
    },
    price: {
        type: Number, // Price of the session
        required: true
    },
    platform: {
        type: String, // e.g., Google Meet, Zoom
        required: true
    },
    timezone: {
        type: String, // e.g., Eastern Time - US & Canada
        required: true
    },
    availableSlots: [{
        date: {
            type: Date,
            required: true
        },
        times: [{
            time: String,
            isBooked: {
                type: Boolean,
                default: false
            }
        }]
    }],
    userInfo: {
        name: String,
        email: String,
        phone: String,
        notes: String
    }
})

const FullSession = mongoose.model('FullSession', fullSessionSchema)

export default FullSession

