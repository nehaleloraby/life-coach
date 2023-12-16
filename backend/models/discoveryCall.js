import mongoose from 'mongoose'

const discoveryCallSchema = new mongoose.Schema({
    title: String,
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
            userInfo: {  
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

const DiscoveryCall = mongoose.model('DiscoveryCall', discoveryCallSchema)

export default DiscoveryCall






