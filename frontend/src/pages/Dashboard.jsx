import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [cities, setCities] = useState([])
  const [loadingCities, setLoadingCities] = useState(true)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Load saved cities when the dashboard first opens
  useEffect(() => {
    api
      .get('/cities')
      .then((res) => setCities(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoadingCities(false))
  }, [navigate])

  // Search for a city's weather
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault()
      if (!searchTerm) return

      setError('')
      setLoadingWeather(true)

      try {
        const res = await api.get(`/weather/${searchTerm}`)
        setWeather(res.data)
      } catch (err) {
        setError(err.response?.data?.detail || 'Something went wrong')
        setWeather(null)
      } finally {
        setLoadingWeather(false)
      }
    },
    [searchTerm]
  )

  async function handleSaveCity() {
    if (!weather) return
    const res = await api.post('/cities', { name: weather.city })
    setCities((prev) => [...prev, res.data])
  }

  async function handleRemoveCity(id) {
    await api.delete(`/cities/${id}`)
    setCities((prev) => prev.filter((c) => c.id !== id))
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Is the currently searched city already saved?
  const isCitySaved = useMemo(() => {
    if (!weather) return false
    return cities.some((c) => c.name.toLowerCase() === weather.city.toLowerCase())
  }, [cities, weather])

  return (
    <div className="weather-dashboard">
      <div className="weather-topbar">
        <h1>☁️ Weather Dashboard</h1>
        <button className="weather-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="weather-search" onSubmit={handleSearch}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loadingWeather && <p className="weather-loading">Fetching weather...</p>}
      {error && <p className="weather-error">{error}</p>}

      {weather && !loadingWeather && (
        <div className="weather-hero">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <div>
            <h2>{weather.city}</h2>
            <p className="weather-temp">{Math.round(weather.temperature)}°C</p>
            <p className="weather-desc">{weather.description}</p>
            <div className="weather-details">
              <span>Feels like {Math.round(weather.feels_like)}°C</span>
              <span>Humidity {weather.humidity}%</span>
              <span>Wind {weather.wind_speed} m/s</span>
            </div>
            {!isCitySaved && (
              <button className="weather-save" onClick={handleSaveCity}>
                + Save City
              </button>
            )}
          </div>
        </div>
      )}

      <h3>Your Cities</h3>
      {loadingCities ? (
        <p className="weather-loading">Loading your cities...</p>
      ) : cities.length === 0 ? (
        <p className="weather-empty">No saved cities yet — search and save one above!</p>
      ) : (
        <ul className="weather-city-list">
          {cities.map((c) => (
            <li key={c.id}>
              <span>{c.name}</span>
              <button onClick={() => handleRemoveCity(c.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard