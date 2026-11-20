import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Home,
  LogOut,
  Shield,
  BookmarkCheck,
  Calendar,
  FlaskConical,
  Search
} from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userJson = localStorage.getItem('hogwarts_user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('hogwarts_user');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: isActive(path) ? '#fff' : 'var(--text-secondary)',
    backgroundColor: isActive(path) ? 'var(--color-navy)' : 'transparent',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  });

  return (
    <header
      style={{
        backgroundColor: '#071533',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.85rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        gap: '1rem',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4.1rem',
            height: '4.1rem'
          }}
        >
          <img
            src="https://www.freepnglogos.com/uploads/hogwarts-logo-png/hogwarts-logo-shadopro-deviantart-0.png"
            alt="Brasão de Hogwarts"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <div>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>
            Diário de Hogwarts
          </h2>

          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-teal-light)',
              fontWeight: 600
            }}
          >
            PORTAL ACADÊMICO
          </span>
        </div>
      </div>

      <nav
        style={{
          display: 'flex',
          gap: '0.4rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Link to="/home" style={linkStyle('/home')}>
          <Home size={16} />
          Dashboard
        </Link>

        <Link to="/spells" style={linkStyle('/spells')}>
          <BookOpen size={16} />
          Grimório
        </Link>

        <Link to="/potions" style={linkStyle('/potions')}>
          <FlaskConical size={16} />
          Poções
        </Link>

        <Link to="/favorites" style={linkStyle('/favorites')}>
          <BookmarkCheck size={16} />
          Feitiços favoritos
        </Link>

        <Link to="/schedule" style={linkStyle('/schedule')}>
          <Calendar size={16} />
          Horários
        </Link>

        <Link to="/schedule/search" style={linkStyle('/schedule/search')}>
          <Search size={16} />
          Buscar aulas
        </Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'rgba(8, 38, 116, 0.5)',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            border: '1px solid var(--border-color)'
          }}
        >
          <Shield size={16} color="var(--color-lavender)" />

          <span style={{ fontSize: '0.85rem', color: '#fff' }}>
            <strong>{user.username}</strong> |{' '}
            <span style={{ color: 'var(--color-lavender)' }}>{user.house}</span>
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
          <LogOut size={15} />
          Sair
        </button>
      </div>
    </header>
  );
}