import React, { useState } from 'react';
import AudioRecorder from '../components/AudioRecorder'; // Import the new component

const HomePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // This function will be called when recording stops
  const handleRecordingStop = (transcript) => {
    console.log("Final Transcript:", transcript);
    setFinalTranscript(transcript);
    
    // We will simulate the AI processing here in the next step
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4 transition-colors duration-500">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Karigarai</h1>
        <p className="text-lg text-gray-600 mt-2">आपकी कहानी, आपकी वेबसाइट।</p>
        <p className="text-md text-gray-500">(Your Story, Your Website.)</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        {/* We only show the recorder if we don't have a final URL */}
        {!websiteUrl && (
          <>
            <p className="text-gray-700">
              नमस्ते! अपनी कला और कहानी के बारे में बताने के लिए नीचे दिए गए माइक बटन को दबाएं। हम आपकी बातों से आपके लिए एक खूबसूरत वेबसाइट बनाएंगे।
            </p>
            
            <AudioRecorder onStop={handleRecordingStop} />

            {/* Display the transcript below the button */}
            {finalTranscript && (
              <div className="w-full p-4 mt-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-left text-gray-700">Your Story:</h3>
                <p className="text-gray-600 text-left mt-2">{finalTranscript}</p>
              </div>
            )}
          </>
        )}

        {/* We will add loading and success states here later */}

      </main>

      <footer className="absolute bottom-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Karigarai. Empowering Artisans.
      </footer>
    </div>
  );
};

export default HomePage;