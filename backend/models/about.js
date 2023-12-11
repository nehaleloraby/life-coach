import mongoose from 'mongoose'

const aboutSchema = new mongoose.Schema({
    imageURL: String,
    qualifications: String,
    biography: {
        type: String,
        required: true
    },
})

const About = mongoose.model('About', aboutSchema)

export default About
