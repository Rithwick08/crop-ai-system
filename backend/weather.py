import requests

API_KEY = "59954309cb1542ddb9b52026260802"

def get_weather(city):

    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}"

    r = requests.get(url).json()

    # ---- safety fallback ----
    if "current" not in r:
        print("Weather API error:", r)
        return {
            "temperature": 25,
            "humidity": 60
        }

    return {
        "temperature": r["current"]["temp_c"],
        "humidity": r["current"]["humidity"]
    }
