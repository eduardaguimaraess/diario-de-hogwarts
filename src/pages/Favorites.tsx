import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpells } from '../services/api';
import type { Spell, UserProfile } from '../types/hogwarts';
import { Star, Loader2, ChevronRight, BookmarkCheck } from 'lucide-react';

export function Favorites() {
  const [favoriteSpells, setFavoriteSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        const userJson = localStorage.getItem('hogwarts_user');
        const user: UserProfile | null = userJson ? JSON.parse(userJson) : null;
        const favoriteIds = user?.favorites || [];

        if (favoriteIds.length > 0) {
          const allSpells = await getSpells();
          const favs = allSpells.filter((spell) => favoriteIds.includes(spell.id));
          setFavoriteSpells(favs);
        } else {
          setFavoriteSpells([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, []);

  const removeFavorite = (id: string) => {
    const userJson = localStorage.getItem('hogwarts_user');
    if (!userJson) return;
    
    const user: UserProfile = JSON.parse(userJson);
    const updatedFavorites = (user.favorites || []).filter((favId) => favId !== id);
    
    const updatedUser = { ...user, favorites: updatedFavorites };
    localStorage.setItem('hogwarts_user', JSON.stringify(updatedUser));
    
    setFavoriteSpells((prev) => prev.filter((spell) => spell.id !== id));
  };

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
        <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem' }}>Buscando feitiços favoritados...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookmarkCheck color="var(--color-lavender)" size={24} /> Meu Livro de Feitiços
        </h1>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Encantamentos salvos para consulta rápida de estudos ({favoriteSpells.length})
        </p>
      </div>

      {favoriteSpells.length === 0 ? (
        <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '3rem', textAlign: 'center' }}>
          <Star color="var(--color-lavender)" size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Nenhum feitiço favoritado ainda</h3>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Navegue pelo Grimório para favoritar seus encantamentos principais.
          </p>
          <Link to="/spells" style={{ backgroundColor: 'var(--color-blue)', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
            Explorar Grimório
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {favoriteSpells.map((spell) => (
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
                    onClick={() => removeFavorite(spell.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}
                    title="Remover dos favoritos"
                  >
                    <Star size={18} fill="var(--color-lavender)" color="var(--color-lavender)" />
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
          ))}
        </div>
      )}
    </div>
  );
}