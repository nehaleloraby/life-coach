import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CoachingPage = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/discovery-calls`)
            .then(response => {
                setSessions(response.data)
            })
            .catch(error => console.error('Error fetching coaching sessions', error))
    }, [])

    return (
        <div>
            <h1>1:1 Coaching Sessions</h1>
            {sessions.map(session => (
                <div key={session._id}>
                    <h2>{session.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default CoachingPage

