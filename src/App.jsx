import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">NekoMoji</h1>
        <p className="text-lg text-gray-600 mb-4">Learn Japanese characters with fun! 🎌</p>
        
        {/* Test Tailwind */}
        <div className="mb-6 p-4 bg-blue-500 text-white rounded-lg">
          <p>✅ Tailwind CSS is working!</p>
        </div>

        {/* Test Google Fonts - Japanese characters */}
        <div className="mb-6 p-4 bg-purple-100 rounded-lg">
          <p className="text-2xl font-bold text-purple-800">あいうえお</p>
          <p className="text-sm text-gray-600">✅ Google Fonts (Noto Sans JP) is loaded!</p>
        </div>

        {/* Counter button */}
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
