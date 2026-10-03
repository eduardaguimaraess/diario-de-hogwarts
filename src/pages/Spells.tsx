import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpells } from '../services/api';
import type { Spell, UserProfile } from '../types/hogwarts';
import { Search, Loader2, AlertTriangle, BookOpen, ChevronRight, Star } from 'lucide-react';

export function Spells() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  // Carrega os feitiços da API e lê os favoritos salvos no localStorage
  useEffect(() => {
    async function loadSpells() {
      try {
        setLoading(true);
        const data = await getSpells();
        setSpells(data);

        const userJson = localStorage.getItem('hogwarts_user');
        if (userJson) {
          const user: UserProfile = JSON.parse(userJson);
          setUserFavorites(user.favorites || []);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadSpells();
  }, []);

  // Função para adicionar ou remover dos favoritos
  const toggleFavorite = (spellId: string) => {
    const userJson = localStorage.getItem('hogwarts_user');
    if (!userJson) return;

    const user: UserProfile = JSON.parse(userJson);
    const currentFavorites = user.favorites || [];

    const updatedFavorites = currentFavorites.includes(spellId)
      ? currentFavorites.filter((id) => id !== spellId)
      : [...currentFavorites, spellId];

    const updatedUser = { ...user, favorites: updatedFavorites };
    localStorage.setItem('hogwarts_user', JSON.stringify(updatedUser));
    setUserFavorites(updatedFavorites);
  };

  // Filtro dinâmico por nome ou incantação
  const filteredSpells = spells.filter((spell) =>
    spell.attributes.name.toLowerCase().includes(search.toLowerCase()) ||
    (spell.attributes.incantation && spell.attributes.incantation.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
        <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem' }}>Carregando dados da API pública...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: '#ff6b6b' }}>
        <AlertTriangle size={36} style={{ marginBottom: '1rem' }} />
        <p>Falha ao conectar com o serviço: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen color="var(--color-lavender)" size={24} /> Grimório de Feitiços
          </h1>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Total de feitiços cadastrados pelos bruxos ({filteredSpells.length} feitiços exibidos)
          </p>
        </div>

        {/* Campo de Pesquisa */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={18} color="var(--color-lavender)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filtrar feitiço ou incantação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.5rem',
              backgroundColor: 'var(--color-navy)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.85rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Grade de Cards do Sistema */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredSpells.map((spell) => {
          const isFav = userFavorites.includes(spell.id);

          return (
            <div 
              key={spell.id} 
              style={{ 
                backgroundColor: '#0b162c', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '1.25rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{spell.attributes.name}</h3>
                  <button
                    onClick={() => toggleFavorite(spell.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                    title={isFav ? "Remover dos favoritos" : "Favoritar feitiço"}
                  >
                    <Star 
                      size={18} 
                      color="var(--color-lavender)" 
                      fill={isFav ? "var(--color-lavender)" : "none"} 
                    />
                  </button>
                </div>
                {spell.attributes.incantation && (
                  <p style={{ color: 'var(--color-teal-light)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    "{spell.attributes.incantation}"
                  </p>
                )}
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.85 }}>
                  {spell.attributes.effect || 'Efeito não detalhado no registro.'}
                </p>
              </div>

              <Link 
                to={`/spells/${spell.id}`} 
                style={{ 
                  marginTop: '1.25rem', 
                  color: 'var(--color-blue)', 
                  fontWeight: 600, 
                  fontSize: '0.85rem', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.2rem' 
                }}
              >
                Ver Detalhes do Registro <ChevronRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}