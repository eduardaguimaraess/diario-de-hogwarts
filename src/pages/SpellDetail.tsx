import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpellById } from '../services/api';
import type { Spell } from '../types/hogwarts';
import { ArrowLeft, Loader2, ShieldAlert, Sparkles } from 'lucide-react';

export function SpellDetail() {
  const { id } = useParams<{ id: string }>();
  const [spell, setSpell] = useState<Spell | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSpell() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getSpellById(id);
        setSpell(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadSpell();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
        <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem' }}>Carregando dados detalhados...</p>
      </div>
    );
  }

  if (error || !spell) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: '#ff6b6b' }}>
        <ShieldAlert size={36} style={{ marginBottom: '1rem' }} />
        <p>Registro indisponível: {error || 'Feitiço não encontrado.'}</p>
      </div>
    );
  }

  const { attributes } = spell;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/spells" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-lavender)', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Voltar à Listagem
      </Link>

      <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Sparkles color="var(--color-lavender)" size={20} />
            <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: 0 }}>{attributes.name}</h1>
          </div>
          {attributes.incantation && (
            <span style={{ color: 'var(--color-teal-light)', fontWeight: 600, fontSize: '0.95rem' }}>
              Incantação: "{attributes.incantation}"
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-navy)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-lavender)' }}>Categoria:</strong>
            <span>{attributes.category || 'Não especificada'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-navy)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-lavender)' }}>Emissão de Luz:</strong>
            <span>{attributes.light || 'Sem especificação'}</span>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--color-navy)', borderRadius: '8px', marginTop: '0.5rem' }}>
            <strong style={{ display: 'block', color: 'var(--color-lavender)', marginBottom: '0.5rem' }}>Efeito Cadastrado:</strong>
            <p style={{ lineHeight: '1.6', color: '#fff', margin: 0 }}>{attributes.effect || 'Sem descrição cadastrada nos tomos.'}</p>
          </div>
        </div>

        {attributes.image && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <img src={attributes.image} alt={attributes.name} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
          </div>
        )}
      </div>
    </div>
  );
}