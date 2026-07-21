---
status: pending
title: Live Weather Forecast App
---

## Overview
A clean, minimal weather forecast app with city search, current conditions, and a 7-day forecast — powered by the OpenWeatherMap API.

---

## Steps

### 1. Project foundation
- Create `src/styles/global.css` with the three `@tailwind` directives.
- Create `src/main.tsx` importing `global.css` and rendering `<App />`.
- Create `src/App.tsx` as the root shell.
- Create `tailwind.config.js` and `postcss.config.js`.
- Create `vite.config.ts` with `@/` path alias pointing to `src/`.
- Create `tsconfig.json` and `tsconfig.node.json` with path alias support.
- Create `index.html` as the Vite entry point.
- Create `package.json` with all required dependencies (react, react-dom, vite, typescript, tailwindcss, postcss, autoprefixer).

**Outcome:** Project boots and shows a blank page with no errors.

---

### 2. TypeScript types
- Create `src/types/weather.ts` defining:
  - `CurrentWeather` — city name, temp, feels like, humidity, wind speed, description, icon code, sunrise, sunset.
  - `DailyForecast` — date, min/max temp, description, icon code, precipitation chance.
  - `WeatherData` — wraps `CurrentWeather` and an array of `DailyForecast`.

**Outcome:** Shared types available across the app with no import errors.

---

### 3. API utility
- Create `src/lib/weatherApi.ts`:
  - Read the API key from the `VITE_OPENWEATHER_API_KEY` environment variable.
  - Export `fetchWeatherByCity(city: string): Promise<WeatherData>` — calls OpenWeatherMap's `/weather` (current) and `/forecast` (5-day/3-hour, aggregated to daily) endpoints, then maps the responses to `WeatherData`.
  - Export `getWeatherIconUrl(iconCode: string): string` — returns the full OpenWeatherMap icon CDN URL.
  - Handle HTTP errors and throw descriptive Error objects.

**Outcome:** API layer is isolated and reusable.

---

### 4. Custom hook — useWeather
- Create `src/hooks/useWeather.ts`:
  - State: `data: WeatherData | null`, `loading: boolean`, `error: string | null`.
  - Expose `search(city: string): void` function that calls `fetchWeatherByCity`, updates state accordingly.
  - On initial mount, default to searching "London" so the app has data to show immediately.

**Outcome:** Any component can call `useWeather()` to get live weather data.

---

### 5. SearchBar component
- Create `src/components/SearchBar.tsx`:
  - Controlled text input with a magnifying-glass icon button.
  - Pressing Enter or clicking the button calls `onSearch(query)`.
  - Shows a subtle loading state (spinner replaces icon) when `loading` is true.
  - Styled with a rounded white card shadow, clean placeholder text.

**Outcome:** Users can type a city name and trigger a search.

---

### 6. CurrentWeatherCard component
- Create `src/components/CurrentWeatherCard.tsx`:
  - Accepts `current: CurrentWeather`.
  - Displays: city name, country, large weather icon, temperature (°C), "feels like", description, humidity %, wind speed km/h, sunrise and sunset times.
  - Uses a subtle gradient card with a light sky background.

**Outcome:** Current conditions are clearly displayed after a search.

---

### 7. DailyForecastCard component
- Create `src/components/DailyForecastCard.tsx`:
  - Accepts a single `DailyForecast`.
  - Displays: day name (e.g. "Mon"), icon, high/low temp, precipitation chance %.
  - Compact card design — used in a horizontal row.

**Outcome:** Individual day forecast tile is ready.

---

### 8. ForecastRow component
- Create `src/components/ForecastRow.tsx`:
  - Accepts `forecast: DailyForecast[]`.
  - Renders a horizontal scrollable row of `DailyForecastCard` components (up to 7 days).
  - Section heading: "7-Day Forecast".

**Outcome:** The full weekly forecast is displayed below the current weather card.

---

### 9. ErrorMessage component
- Create `src/components/ErrorMessage.tsx`:
  - Accepts `message: string`.
  - Shows a friendly inline error with a warning icon (e.g. city not found, network issue).

**Outcome:** Users see a helpful message instead of a broken UI on errors.

---

### 10. Assemble App page
- Update `src/App.tsx`:
  - Use `useWeather()` hook.
  - Layout (top to bottom): `SearchBar`, then conditionally render `CurrentWeatherCard` + `ForecastRow` when data is present, or `ErrorMessage` when error is set, or a skeleton/loading spinner while fetching.
  - Centred page layout with a soft sky-blue/white gradient background.
  - Footer with a small attribution note: "Powered by OpenWeatherMap".

**Outcome:** Fully functional weather app — search a city and see current + 7-day forecast.

---

### 11. Environment variable setup
- Create `.env.example` with `VITE_OPENWEATHER_API_KEY=your_key_here` as a template.
- Create `.gitignore` that includes `.env`.

**Outcome:** Users know exactly where to put their API key; the key is never committed.

---

### 12. Loading skeleton (polish)
- Create `src/components/SkeletonLoader.tsx`:
  - Renders animated pulse placeholders in the shape of the `CurrentWeatherCard` and `ForecastRow` while data is loading.

**Outcome:** The app feels polished — no blank flicker during fetch.
