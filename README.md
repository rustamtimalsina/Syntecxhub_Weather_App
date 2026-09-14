# Syntecxhub Weather App

A full-stack weather application built as part of the Syntecxhub Web Development Internship. Users can sign up, log in, search for cities, and save their favorite locations to track live weather conditions.

## Features

- 🔐 JWT-based authentication (signup, login, logout)
- 🌦️ Live weather data via the OpenWeatherMap API
- ⭐ Save and manage favorite cities per user
- ⚠️ Error handling for invalid city searches
- 🎨 Custom sky-themed UI with smooth animations
- 📱 Multi-page navigation with React Router

## Tech Stack

**Frontend**
- React
- React Router (react-router-dom)
- Axios

**Backend**
- FastAPI (Python)
- SQLite (stores users and saved favorite cities)
- JWT authentication
- OpenWeatherMap API integration

## Project Structure

```
Syntecxhub_Weather_App/
├── frontend/     # React application
└── backend/      # FastAPI application
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

You'll need an OpenWeatherMap API key — add it to a `.env` file in the backend directory:

```
OPENWEATHER_API_KEY=your_api_key_here
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## What I Learned

This project was a good exercise in connecting a React frontend to a real external API through a Python backend — handling live data, managing per-user saved state, and building error handling for bad or missing input (like invalid city names).

## Author

**Rustam Timalsina**
Web Development Intern @ Syntecxhub
[LinkedIn](https://www.linkedin.com/in/rustam-timalsina-76b87a313/) · [GitHub](https://github.com/rustamtimalsina)
