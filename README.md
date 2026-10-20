# 📰 AI News Headline Analyzer

An AI-powered web application built with Python and Flask to analyze news headlines and provide useful insights using Generative AI.

## ✨ Features

- Analyze news headlines using AI.
- Generate an interpretation of the submitted headline.
- Simple, user-friendly web interface.
- Responsive frontend built with HTML, CSS, and JavaScript.
- Gemini API integration for AI-powered analysis.

## 🛠️ Technologies Used

- **Language:** Python
- **Backend:** Flask
- **AI:** Google Gemini API
- **Frontend:** HTML, CSS, JavaScript

## 📁 Project Structure

```text
ai_news_headline_analyzer/
├── app.py
├── headline_analyzer.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/chethansree77/ai-news-headline-analyzer.git
cd ai-news-headline-analyzer
```

### 2. Create and activate a virtual environment

On Windows PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

Install the packages required by the application:

```powershell
pip install flask google-genai python-dotenv
```

If your project has a `requirements.txt` file, you can instead install dependencies with:

```powershell
pip install -r requirements.txt
```

### 4. Configure your API key

Create a `.env` file in the project root:

```text
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your own Gemini API key. Never commit or upload your `.env` file.

### 5. Run the application

```powershell
python app.py
```

Open the local address shown in your terminal, usually `http://127.0.0.1:5000`.

## 🔐 Security

- API keys are stored in environment variables.
- The `.env` file should remain excluded through `.gitignore`.
- Never publish private API keys or credentials.

## 👩‍💻 Author

**Chintha Chethana Sai Sree**

GitHub: [chethansree77](https://github.com/chethansree77)

## 📄 License

This project is available for educational and portfolio purposes. Add a license file if you decide to distribute it under specific reuse terms.