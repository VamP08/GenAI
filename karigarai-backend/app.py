from flask import Flask, jsonify, request
from flask_cors import CORS
from googletrans import Translator

# Initialize Flask App and CORS
app = Flask(__name__)
CORS(app) # This allows requests from our React app

# Initialize the translator
translator = Translator()

# Mock AI: A predefined list of questions to build the artisan's profile
QUESTIONS = [
    "What is your full name?",
    "What is the name of your craft or art form? For example, 'Pottery', 'Handloom Weaving', or 'Metal Engraving'.",
    "How many years have you been practicing this craft?",
    "Tell me a short story about how you learned your craft. Was it passed down from your family?",
    "What makes your products special or unique compared to others?",
    "What are the main materials you use to create your art?",
]

@app.route("/api/conversation", methods=['POST'])
def handle_conversation():
    data = request.json
    conversation_history = data.get("conversation_history", [])
    
    # Determine which question to ask next
    questions_asked_count = len([msg for msg in conversation_history if msg['role'] == 'ai'])
    
    if questions_asked_count >= len(QUESTIONS):
        # If all questions have been asked, end the conversation
        # In the future, we will generate the profile here
        return jsonify({
            "status": "complete",
            "message": "Thank you! We have enough information to build your profile.",
            "final_profile": {"message": "Profile will be generated here."}
        })
    else:
        # Get the next question
        next_question_en = QUESTIONS[questions_asked_count]
        
        # Translate the question to Hindi
        try:
            translation = translator.translate(next_question_en, src='en', dest='hi')
            next_question_hi = translation.text
        except Exception as e:
            print(f"Translation error: {e}")
            next_question_hi = "क्षमा करें, अनुवाद में एक त्रुटि हुई।" # Sorry, there was an error in translation.

        return jsonify({
            "status": "in-progress",
            "next_question_en": next_question_en,
            "next_question_hi": next_question_hi
        })

if __name__ == "__main__":
    app.run(debug=True, port=5000)