import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'gu-IN'; // Set to Gujarati-India. Change to 'hi-IN' for Hindi.
}

const AudioRecorder = ({ onStop }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(recognition);

  useEffect(() => {
    if (!recognitionRef.current) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const rec = recognitionRef.current;

    rec.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    rec.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Clean up on component unmount
    return () => {
      rec.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      onStop(transcript); // Send the final transcript to the parent
    } else {
      setTranscript(''); // Clear previous transcript
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={toggleListening}
        className={`group flex items-center justify-center w-24 h-24 rounded-full text-white shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 ${
          isListening 
            ? 'bg-blue-500 focus:ring-blue-300 animate-pulse' 
            : 'bg-red-500 focus:ring-red-300'
        }`}
        aria-label={isListening ? 'Stop recording' : 'Start recording'}
      >
        {isListening 
          ? <Square size={40} className="fill-white" /> 
          : <Mic size={48} className="transition-transform duration-300 group-hover:scale-125" />
        }
      </button>
      <p className="text-sm text-gray-500">
        {isListening ? 'Listening... Press the button to stop.' : 'Press the button to begin.'}
      </p>
    </div>
  );
};

export default AudioRecorder;