import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PodcastsPage = () => {
    const [podcasts, setPodcasts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/podcasts`)
            .then(response => {
                setPodcasts(response.data);
            })
            .catch(error => console.error('Error fetching podcasts', error))
    }, [])

    return (
        <div>
            <h1>Recommended Podcasts</h1>
            {podcasts.map(podcast => (
                <div key={podcast._id}>
                    <h2>{podcast.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default PodcastsPage
