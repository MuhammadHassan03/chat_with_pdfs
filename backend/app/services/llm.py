import requests
import json
import os

def ask_gemini(prompt: str):
    url = "https://openrouter.ai/api/v1/chat/completions"
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "http://localhost:3000", # Optional but good
        "X-OpenRouter-Title": "ChatPDF-Hassan",  # Optional but good
        "Content-Type": "application/json"
    }

    # "google/gemini-2.0-flash-001:free" is the current best free model
    payload = {
        "model": "google/gemini-2.0-flash-001",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response_data = response.json()

        # Debugging ke liye agar error aaye
        if response.status_code != 200:
            print(f"Error from OpenRouter: {response_data}")
            return "I'm having a little trouble connecting to my brain. Let me check the settings."

        return response_data['choices'][0]['message']['content']

    except Exception as e:
        print(f"Connection Error: {e}")
        return "The AI is taking a short break. Please try again in 5 seconds!"