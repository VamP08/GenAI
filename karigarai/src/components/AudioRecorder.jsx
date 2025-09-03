import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const AudioRecorder = ({ onStop }) => {
  const [isListening, setIsListening] = useState(false);
  
  // Use refs to hold the recognition object and transcript
  // This prevents them from being affected by parent component re-renders
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  // This effect runs ONLY ONCE to set up the speech recognition
  useEffect(() => {
    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN'; // Set to Hindi for the artisan

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      transcriptRef.current += finalTranscript;
    };

    recognition.onend = () => {
      // This is called when recording stops for any reason.
      // We call the onStop prop with the final transcript and update our state.
      onStop(transcriptRef.current);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    // Store the created recognition object in our ref
    recognitionRef.current = recognition;
    
    // The empty dependency array [] ensures this setup code runs only once.
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop(); // This will trigger the 'onend' event handler
    } else {
      transcriptRef.current = ''; // Clear previous transcript
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={toggleListening}
        disabled={!recognitionRef.current} // Disable button if API not supported
        className={`group flex items-center justify-center w-24 h-24 rounded-full text-white shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
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
    </div>
  );
};

export default AudioRecorder;