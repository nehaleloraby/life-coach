import mongoose from 'mongoose'

const discoveryCallSchema = new mongoose.Schema({
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
        type: Number, 
    },
    platform: {
        type: String, 
        required: true
    },
    timezone: {
        type: String, 
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

const DiscoveryCall = mongoose.model('DiscoveryCall', discoveryCallSchema)

export default DiscoveryCall



