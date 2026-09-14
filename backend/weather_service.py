import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def fetch_weather(city_name: str):
    params = {
        "q": city_name,
        "appid": API_KEY,
        "units": "metric",  # gives us Celsius instead of Kelvin
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code == 404:
        return None  # city not found

    response.raise_for_status()  # raises an error for other issues (like bad API key)

    data = response.json()

    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "icon": data["weather"][0]["icon"],
    }