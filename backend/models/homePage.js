import mongoose from 'mongoose'

const homePageSchema = new mongoose.Schema({
    imageURL: String,
    headline: String, 
    description: String, 
})

const HomePage = mongoose.model('HomePage', homePageSchema)

export default HomePage

