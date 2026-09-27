import { useEffect, useState } from 'react';
import { getPotions } from '../services/api';
import type { Potion } from '../types/hogwarts';
import { FlaskConical, Loader2, AlertTriangle, Search, Sparkles } from 'lucide-react';

export function Potions() {
  const [potions, setPotions] = useState<Potion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    async function loadPotions() {
      try {
        setLoading(true);
        const data = await getPotions();
        setPotions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadPotions();
  }, []);

  const filteredPotions = potions.filter((potion) =>
    potion.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
        <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem' }}>Consultando receitas do Laboratório de Poções...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: '#ff6b6b' }}>
        <AlertTriangle size={36} style={{ marginBottom: '1rem' }} />
        <p>Falha ao conectar com o laboratório: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FlaskConical color="var(--color-lavender)" size={24} /> Laboratório de Poções
          </h1>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Receitas e elixires catalogados na Seção Reservada ({filteredPotions.length} poções)
          </p>
        </div>

        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={18} color="var(--color-lavender)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filtrar por nome da poção..."
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredPotions.map((potion) => (
          <div
            key={potion.id}
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
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{potion.attributes.name}</h3>
                <Sparkles size={16} color="var(--color-lavender)" />
              </div>

              {potion.attributes.difficulty && (
                <span style={{ display: 'inline-block', backgroundColor: 'var(--color-purple-dark)', color: 'var(--color-lavender)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Dificuldade: {potion.attributes.difficulty}
                </span>
              )}

              <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, marginBottom: '0.75rem' }}>
                <strong>Efeito:</strong> {potion.attributes.effect || 'Efeito reservado ao preparo avançado.'}
              </p>

              {potion.attributes.ingredients && (
                <p style={{ color: 'var(--color-teal-light)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <strong>Ingredientes:</strong> {potion.attributes.ingredients}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}