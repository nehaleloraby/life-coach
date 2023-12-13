import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer'
import AboutPage from './components/AboutPage'
import CoachingPage from './components/CoachingPage'
import VideosPage from './components/VideosPage'
import BooksPage from './components/BooksPage'
import PodcastsPage from './components/PodcastsPage'
import AdminLoginPage from './components/AdminLoginPage'
import AdminDashboardPage from './components/AdminDashboardPage'

function App() {
  return (
   <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/coaching" element={<CoachingPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/portalmanagement" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
   </ChakraProvider>
  )
}

export default App
