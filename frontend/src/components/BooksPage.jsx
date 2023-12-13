import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BooksPage = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => console.error('Error fetching books', error))
    }, [])

    return (
        <div>
            <h1>Recommended Books</h1>
            {books.map(book => (
                <div key={book._id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                </div>
            ))}
        </div>
    )
}

export default BooksPage

