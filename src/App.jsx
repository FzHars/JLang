import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Home from './components/Home'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [mode, setMode] = useState(null)
  const [selectedGroups, setSelectedGroups] = useState([])

  const handleStartLanding = () => {
    setCurrentPage('home')
  }

  const handleStartHome = (selectedMode, selectedSubGroups) => {
    setMode(selectedMode)
    setSelectedGroups(selectedSubGroups)
    setCurrentPage('training')
  }

  return (
    <>
      {currentPage === 'landing' && <LandingPage onStart={handleStartLanding} />}
      {currentPage === 'home' && <Home onStart={handleStartHome} />}
      {currentPage === 'training' && (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Training Mode</h1>
            <p className="text-gray-600 mt-4">Mode: {mode} | Groups: {selectedGroups.join(', ')}</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
