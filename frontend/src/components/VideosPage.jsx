import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VideosPage = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos`)
            .then(response => {
                setVideos(response.data)
            })
            .catch(error => console.error('Error fetching videos', error))
    }, [])

    return (
        <div>
            <h1>Videos</h1>
            {videos.map(video => (
                <div key={video._id}>
                    <h2>{video.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default VideosPage
