import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Image, Text, Heading, Container } from '@chakra-ui/react'

const AboutPage = () => {
    const [aboutInfo, setAboutInfo] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/about`)
            .then(response => {
                setAboutInfo(response.data)
            })
            .catch(error => {
                console.error('Error fetching about information', error)
            })
    }, [])

    return (
        <Container maxW="container.lg">
            <Box textAlign="center" py={10}>
                <Heading as="h1" size="xl" mb={6}>
                    Hello,
                </Heading>
                {aboutInfo.imageURL && (
                    <Image src={aboutInfo.imageURL} alt="Life Coach" mb={6} />
                )}
                <Heading as="h2" size="lg" mb={3}>
                    {aboutInfo.qualifications}
                </Heading>
                <Text fontSize="lg">
                    {aboutInfo.biography || "My name is Mariana and I am a spiritual life coach dedicated to self-love and inner harmony. I am passionate about helping people heal, find inner peace, and embrace the power of self-love. Whether you are navigating life's challenges or seeking a deeper connection with your inner self, I am here to guide you towards a path of transformation and growth."}
                </Text>
            </Box>
        </Container>
    )
}

export default AboutPage



