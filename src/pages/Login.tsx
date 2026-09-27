import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [house, setHouse] = useState('Grifinória');
  const [wand, setWand] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return alert('Informe seu nome de bruxo!');

    const userData = { username, house, wand: wand || 'Madeira de Salgueiro com Fibra de Coração de Dragão' };
    localStorage.setItem('hogwarts_user', JSON.stringify(userData));
    navigate('/home');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2.5rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-purple-dark)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', border: '1px solid var(--color-lavender)' }}>
          <Sparkles color="var(--color-lavender)" size={28} />
        </div>
        <h1 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0.4rem' }}>Acesso ao Sistema</h1>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.85rem' }}>Autenticação Acadêmica de Hogwarts</p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Nome do Estudante / Bruxo:</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'var(--color-navy)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box' }}
            placeholder="Ex: Harry Potter"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Casa de Hogwarts:</label>
          <select value={house} onChange={(e) => setHouse(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'var(--color-navy)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}>
            <option value="Grifinória">Grifinória</option>
            <option value="Sonserina">Sonserina</option>
            <option value="Corvinal">Corvinal</option>
            <option value="Lufa-Lufa">Lufa-Lufa</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Especificação da Varinha:</label>
          <input
            type="text"
            value={wand}
            onChange={(e) => setWand(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'var(--color-navy)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box' }}
            placeholder="Ex: Teixo com Núcleo de Fênix"
          />
        </div>

        <button type="submit" style={{ backgroundColor: 'var(--color-blue)', color: '#fff', padding: '0.85rem', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
          <ShieldCheck size={18} /> Acessar Sistema
        </button>
      </form>
    </div>
  );
}