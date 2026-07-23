import { useState } from 'react';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CITIES = [
  'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
  'Dubai', 'Mumbai', 'Toronto', 'Berlin', 'Singapore',
  'Los Angeles', 'Chicago', 'Seoul', 'Shanghai', 'Mexico City',
  'São Paulo', 'Cairo', 'Istanbul', 'Moscow', 'Bangkok',
];

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (selectedCity?: string) => {
    const target = selectedCity || city;
    if (!target.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(target)}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected) {
      setCity(selected);
      fetchWeather(selected);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-blue-600 text-4xl font-bold mb-8">Weather Forecast</h1>

      {/* Dropdown */}
      <div className="w-full max-w-md mb-4">
        <select
          onChange={handleDropdown}
          defaultValue=""
          className="w-full px-4 py-3 rounded-xl text-blue-600 text-lg outline-none bg-blue-50 border border-blue-200"
        >
          <option value="" disabled>Select a city...</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Manual search */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          placeholder="Or type a city name..."
          className="flex-1 px-4 py-3 rounded-xl text-blue-600 text-lg outline-none border border-blue-200 bg-blue-50"
        />
        <button
          onClick={() => fetchWeather()}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-600 text-xl">Fetching weather...</p>}
      {error && <p className="text-blue-400 text-lg">{error}</p>}

      {weather && (
        <div className="bg-blue-50 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700">
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="mx-auto w-24 h-24"
          />
          <p className="text-6xl font-extrabold text-blue-700">{Math.round(weather.main.temp)}°C</p>
          <p className="text-blue-500 capitalize text-xl mt-1">{weather.weather[0].description}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-blue-700">
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <p className="text-sm text-blue-500">Feels Like</p>
              <p className="text-lg font-semibold">{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <p className="text-sm text-blue-500">Humidity</p>
              <p className="text-lg font-semibold">{weather.main.humidity}%</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <p className="text-sm text-blue-500">Wind</p>
              <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
