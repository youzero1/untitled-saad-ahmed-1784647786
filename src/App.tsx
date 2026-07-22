import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherPage from '@/pages/WeatherPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}
