export default function LandingPage() {
  return (
    <>
      <div className="">
        <div className="text-center text-white px-6">
          <h1 className="text-6xl font-bold mb-4">NekoMoji</h1>
          <p className="text-xl mb-8">Japanese Kana Learning App</p>
          <button
            onClick={onStartLearning}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg            
  font-semibold hover:bg-gray-100 transition-colors"
          >
            Start  
          </button>
        </div>
      </div>
    </>
  );
}
