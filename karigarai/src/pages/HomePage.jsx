import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Karigarai</h1>
        <p className="text-lg text-gray-600 mt-2">आपकी कहानी, आपकी वेबसाइट।</p>
        <p className="text-md text-gray-500">(Your Story, Your Website.)</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <p className="max-w-prose text-gray-700">
          नमस्ते! अपनी कला और कहानी बताने के लिए शुरुआत करें। हम आपसे कुछ सवाल पूछेंगे और आपके जवाबों से आपके लिए एक खूबसूरत वेबसाइट बनाएंगे।
        </p>
        
        {/* This is the new navigation button */}
        <Link
          to="/qa"
          className="group flex items-center justify-center w-48 h-16 bg-red-500 text-white font-bold rounded-lg text-xl shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300"
          aria-label="Let's Get Started"
        >
          शुरू करें (Get Started)
        </Link>
      </main>

      <footer className="absolute bottom-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Karigarai. Empowering Artisans.
      </footer>
    </div>
  );
};

export default HomePage;