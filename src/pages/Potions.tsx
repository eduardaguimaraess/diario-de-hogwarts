import React, { useEffect, useState } from 'react';
import { getPotions, getCustomPotions, createCustomPotion } from '../services/api';
import type { Potion, CustomPotion } from '../types/hogwarts';
import { FlaskConical, Loader2, AlertTriangle, Search, Sparkles, Plus, BookOpen, Wand2, X } from 'lucide-react';

export function Potions() {
  const [activeTab, setActiveTab] = useState<'public' | 'custom'>('public');

  // Estados da API Pública
  const [potions, setPotions] = useState<Potion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  // Estados da API Própria (Fastify)
  const [customPotions, setCustomPotions] = useState<CustomPotion[]>([]);
  const [loadingCustom, setLoadingCustom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    difficulty: 'Intermediário',
    effect: '',
    ingredients: ''
  });

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

  async function loadCustomPotions() {
    try {
      setLoadingCustom(true);
      const data = await getCustomPotions();
      setCustomPotions(data);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoadingCustom(false);
    }
  }

  useEffect(() => {
    if (activeTab === 'custom') {
      loadCustomPotions();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomPotion(formData);
      setFormData({ name: '', difficulty: 'Intermediário', effect: '', ingredients: '' });
      setIsModalOpen(false);
      loadCustomPotions();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const filteredPotions = potions.filter((potion) =>
    potion.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCustomPotions = customPotions.filter((potion) =>
    potion.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <FlaskConical color="var(--color-lavender)" size={24} /> Laboratório de Poções
          </h1>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Consulte elixires oficiais da Seção Reservada ou formule novas poções no caldeirão
          </p>
        </div>

        {activeTab === 'custom' && (
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: 'var(--color-blue)', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} /> Criar Nova Poção
          </button>
        )}
      </div>

      {/* Navegação entre Abas + Barra de Busca */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setActiveTab('public')}
            style={{ padding: '0.75rem 1.25rem', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === 'public' ? '3px solid var(--color-lavender)' : '3px solid transparent', color: activeTab === 'public' ? '#fff' : 'var(--text-secondary)', fontWeight: activeTab === 'public' ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <BookOpen size={18} /> Acervo Oficial
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            style={{ padding: '0.75rem 1.25rem', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === 'custom' ? '3px solid var(--color-lavender)' : '3px solid transparent', color: activeTab === 'custom' ? '#fff' : 'var(--text-secondary)', fontWeight: activeTab === 'custom' ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Wand2 size={18} /> Minhas Poções
          </button>
        </div>

        {/* Input de Pesquisa */}
        <div style={{ position: 'relative', width: '280px', marginBottom: '0.5rem' }}>
          <Search size={16} color="var(--color-lavender)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filtrar poção por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.2rem',
              backgroundColor: 'var(--color-navy)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.8rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* --- ABA 1: ACERVO OFICIAL (API PÚBLICA) --- */}
      {activeTab === 'public' && (
        loading ? (
          <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
            <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.95rem' }}>Consultando receitas do Laboratório de Poções...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '5rem', textAlign: 'center', color: '#ff6b6b' }}>
            <AlertTriangle size={36} style={{ marginBottom: '1rem' }} />
            <p>Falha ao conectar com o laboratório: {error}</p>
          </div>
        ) : (
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
        )
      )}

      {/* --- ABA 2: POÇÕES FORMULADAS NO BACKEND FASTIFY --- */}
      {activeTab === 'custom' && (
        loadingCustom ? (
          <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
            <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.95rem' }}>Buscando poções formuladas...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredCustomPotions.map((potion) => (
              <div
                key={potion.id}
                style={{
                  backgroundColor: '#071533',
                  border: '1px solid var(--color-purple-dark)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{potion.name}</h3>
                    <Sparkles size={16} color="var(--color-lavender)" />
                  </div>

                  <span style={{ display: 'inline-block', backgroundColor: 'var(--color-purple-dark)', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Dificuldade: {potion.difficulty}
                  </span>

                  <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, marginBottom: '0.75rem' }}>
                    <strong>Efeito:</strong> {potion.effect}
                  </p>

                  <p style={{ color: 'var(--color-teal-light)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                    <strong>Ingredientes:</strong> {potion.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modal de Cadastro */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Formular Nova Poção</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Nome da Poção</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Felix Felicis (Sorte Líquida)" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Nível de Dificuldade</label>
                <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Perigoso">Perigoso</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Efeito Mágico Espagírico</label>
                <textarea required rows={2} value={formData.effect} onChange={(e) => setFormData({ ...formData, effect: e.target.value })} placeholder="Ex: Concede sorte extraordinária a quem beber..." style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Lista de Ingredientes</label>
                <input type="text" required value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} placeholder="Ex: Hordéolo, raiz de asfódelo, acônito" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: 'var(--color-blue)', border: 'none', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cadastrar Poção</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}