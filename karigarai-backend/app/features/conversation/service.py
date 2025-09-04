from typing import List, Dict
from deep_translator import GoogleTranslator
from app.core.config import QUESTIONS # Import questions from the config file

def process_conversation_turn(conversation_history: List[Dict]) -> Dict:
    """
    Determines the next question, translates it, and returns the response.
    """
    questions_asked_count = len([msg for msg in conversation_history if msg['role'] == 'ai'])
    
    if questions_asked_count >= len(QUESTIONS):
        return {
            "status": "complete",
            "message": "Thank you! We have enough information to build your profile.",
        }
    else:
        next_question_en = QUESTIONS[questions_asked_count]
        
        try:
            next_question_hi = GoogleTranslator(source='en', target='hi').translate(next_question_en)
        except Exception as e:
            print(f"Translation error: {e}")
            next_question_hi = "क्षма करें, अनुवाद में एक त्रुटि हुई।"

        return {
            "status": "in-progress",
            "next_question_en": next_question_en,
            "next_question_hi": next_question_hi
        }