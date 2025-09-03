import React, { useState, useEffect, useCallback } from 'react'; // <-- useCallback is added here
import AudioRecorder from '../components/AudioRecorder';

const QAPage = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_history: [] }),
      });
      const data = await response.json();
      
      setCurrentQuestion(data.next_question_hi);
      setConversationHistory([{ role: 'ai', content: data.next_question_en }]);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setCurrentQuestion("माफ़ कीजिए, सर्वर से कनेक्ट नहीं हो सका।");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    startConversation();
  }, []);

  // This function is now wrapped in useCallback
  const handleRecordingStop = useCallback((transcript) => {
    setUserAnswer(transcript);
  }, []); // Empty dependency array ensures the function isn't recreated

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Please provide an answer.");
      return;
    }

    setIsLoading(true);

    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: userAnswer }
    ];

    try {
      const response = await fetch('http://127.0.0.1:5000/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_history: newHistory }),
      });
      const data = await response.json();

      if (data.status === 'complete') {
        setIsComplete(true);
        setCompletionMessage(data.message);
      } else {
        setCurrentQuestion(data.next_question_hi);
        setUserAnswer('');
        const finalHistory = [...newHistory, { role: 'ai', content: data.next_question_en }];
        setConversationHistory(finalHistory);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setCurrentQuestion("माफ़ कीजिए, कोई त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
    setIsLoading(false);
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4 text-center">
        <h1 className="text-3xl font-bold text-green-800">धन्यवाद! (Thank you!)</h1>
        <p className="text-lg mt-4 text-gray-700">{completionMessage}</p>
        <p className="text-md mt-2 text-gray-600">Your personalized dashboard will be ready soon.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Karigarai AI Interview</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md min-h-[100px] flex items-center justify-center">
          <p className="text-xl text-gray-700 font-semibold text-center">
            {isLoading ? 'Loading next question...' : currentQuestion}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <AudioRecorder onStop={handleRecordingStop} />
          
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="अपना जवाब यहाँ बोलें या टाइप करें... (Speak or type your answer here...)"
            disabled={isLoading}
          />

          <button
            onClick={handleSubmitAnswer}
            disabled={isLoading || !userAnswer.trim()}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? 'Processing...' : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAPage;