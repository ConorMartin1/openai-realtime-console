
const CoachSettingsPage: React.FC = () => {


    return (
        <div className="min-h-screen bg-white flex flex-col">
          <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="ml-4 text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                    SpeechCraft
                  </div>
                </div>
              </div>
            </div>
          </nav>
    
          <main className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900">AI Speech Coach</h1>
              <p className="mt-2 text-gray-600">Practice your presentation with real-time AI feedback</p>
            </div>
    
          </main>
        </div>
      );
    };
    
    export default CoachSettingsPage;