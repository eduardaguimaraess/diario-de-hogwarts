import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Spells } from './pages/Spells';
import { SpellDetail } from './pages/SpellDetail';
import { Favorites } from './pages/Favorites';
import { Schedule } from './pages/Schedule';
import { Potions } from './pages/Potions';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/spells" element={<Spells />} />
        <Route path="/spells/:id" element={<SpellDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/potions" element={<Potions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;