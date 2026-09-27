import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Home, LogOut, Shield, BookmarkCheck, Calendar, FlaskConical } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userJson = localStorage.getItem('hogwarts_user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('hogwarts_user');
    navigate('/');
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: '#071533',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.85rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          backgroundColor: 'rgba(8, 38, 116, 0.4)',
          border: '1px solid var(--border-color)',
          padding: '0.35rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Brasão Colorido de Hogwarts Renderizado Diretamente em SVG (100% à prova de falhas) */}
          <svg width="32" height="36" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L90 20 V60 C90 85 50 105 50 105 C50 105 10 85 10 60 V20 Z" fill="#131129" stroke="#d4af37" strokeWidth="3"/>
            {/* Grifinória (Quadrante Superior Esquerdo - Vermelho) */}
            <path d="M50 12 L48 53 H15 V22 Z" fill="#740001" />
            {/* Sonserina (Quadrante Superior Direito - Verde) */}
            <path d="M50 12 L52 53 H85 V22 Z" fill="#1A472A" />
            {/* Lufa-Lufa (Quadrante Inferior Esquerdo - Amarelo/Dourado) */}
            <path d="M15 57 H48 L50 97 C35 90 20 78 15 65 Z" fill="#ECB939" />
            {/* Corvinal (Quadrante Inferior Direito - Azul) */}
            <path d="M85 57 H52 L50 97 C65 90 80 78 85 65 Z" fill="#0E1A40" />
            {/* Linhas Divisórias em Dourado */}
            <line x1="50" y1="12" x2="50" y2="97" stroke="#d4af37" strokeWidth="2" />
            <line x1="15" y1="55" x2="85" y2="55" stroke="#d4af37" strokeWidth="2" />
            {/* Letra H de Hogwarts ao Centro */}
            <text x="50" y="62" fontStyle="serif" fontWeight="bold" fontSize="24" fill="#ffffff" textAnchor="middle" fontFamily="Cinzel, Georgia, serif">H</text>
          </svg>
        </div>
        <div>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>Diário de Hogwarts</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-teal-light)', fontWeight: 600 }}>PORTAL ACADÊMICO</span>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link 
          to="/home" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isActive('/home') ? '#fff' : 'var(--text-secondary)',
            backgroundColor: isActive('/home') ? 'var(--color-navy)' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <Home size={16} /> Dashboard
        </Link>
        <Link 
          to="/spells" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isActive('/spells') ? '#fff' : 'var(--text-secondary)',
            backgroundColor: isActive('/spells') ? 'var(--color-navy)' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <BookOpen size={16} /> Grimório
        </Link>
        <Link 
          to="/potions" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isActive('/potions') ? '#fff' : 'var(--text-secondary)',
            backgroundColor: isActive('/potions') ? 'var(--color-navy)' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <FlaskConical size={16} /> Poções
        </Link>
        <Link 
          to="/favorites" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isActive('/favorites') ? '#fff' : 'var(--text-secondary)',
            backgroundColor: isActive('/favorites') ? 'var(--color-navy)' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <BookmarkCheck size={16} /> Meus Favoritos
        </Link>
        <Link 
          to="/schedule" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isActive('/schedule') ? '#fff' : 'var(--text-secondary)',
            backgroundColor: isActive('/schedule') ? 'var(--color-navy)' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <Calendar size={16} /> Horários
        </Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: 'rgba(8, 38, 116, 0.5)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <Shield size={16} color="var(--color-lavender)" />
          <span style={{ fontSize: '0.85rem', color: '#fff' }}>
            <strong>{user.username}</strong> | <span style={{ color: 'var(--color-lavender)' }}>{user.house}</span>
          </span>
        </div>
        <button 
          onClick={handleLogout} 
          style={{
            backgroundColor: 'rgba(231, 76, 60, 0.15)',
            border: '1px solid rgba(231, 76, 60, 0.4)',
            color: '#ff6b6b',
            padding: '0.45rem 0.85rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <LogOut size={15} /> Sair
        </button>
      </div>
    </header>
  );
}