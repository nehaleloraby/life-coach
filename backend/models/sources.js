import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    imageURL: String,
    link: String
})

const podcastSchema = new mongoose.Schema({
    title: String,
    imageURL: String,
    link: String,
})

const Video = mongoose.model('Video', videoSchema)
const Book = mongoose.model('Book', bookSchema)
const Podcast = mongoose.model('Podcast', podcastSchema)

export { Video, Book, Podcast }
