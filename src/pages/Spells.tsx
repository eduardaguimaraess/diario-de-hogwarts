import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSpells, getCustomSpells, createCustomSpell } from '../services/api';
import type { Spell, CustomSpell, UserProfile } from '../types/hogwarts';
import { Scroll, Wand2, Plus, Loader2, X, BookOpen, ChevronRight, Star } from 'lucide-react';

export function Spells() {
  const [activeTab, setActiveTab] = useState<'public' | 'custom'>('public');

  // Estados da API Pública
  const [publicSpells, setPublicSpells] = useState<Spell[]>([]);
  const [loadingPublic, setLoadingPublic] = useState<boolean>(true);

  // Estado dos Favoritos (alinhado com o Favorites.tsx)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Estados da API Própria (Fastify)
  const [customSpells, setCustomSpells] = useState<CustomSpell[]>([]);
  const [loadingCustom, setLoadingCustom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', category: 'Encantamento', effect: '' });

  // Carrega os favoritos atuais do localStorage
  useEffect(() => {
    const userJson = localStorage.getItem('hogwarts_user');
    if (userJson) {
      const user: UserProfile = JSON.parse(userJson);
      setFavorites(user.favorites || []);
    }
  }, []);

  // Carrega a lista da API Pública
  useEffect(() => {
    async function loadPublicSpells() {
      try {
        setLoadingPublic(true);
        const data = await getSpells();
        setPublicSpells(data);
      } catch (err) {
        console.error('Erro ao carregar acervo público:', err);
      } finally {
        setLoadingPublic(false);
      }
    }
    loadPublicSpells();
  }, []);

  // Alterna o estado de favorito de um feitiço e persiste no localStorage
  const toggleFavorite = (spellId: string) => {
    const userJson = localStorage.getItem('hogwarts_user');
    const user: UserProfile = userJson
      ? JSON.parse(userJson)
      : { username: 'Estudante', house: 'Grifinória', wand: 'Padrão', favorites: [] };

    const currentFavorites = user.favorites || [];
    const isFav = currentFavorites.includes(spellId);

    const updatedFavorites = isFav
      ? currentFavorites.filter(id => id !== spellId)
      : [...currentFavorites, spellId];

    const updatedUser = { ...user, favorites: updatedFavorites };
    localStorage.setItem('hogwarts_user', JSON.stringify(updatedUser));
    setFavorites(updatedFavorites);
  };

  // Carrega os feitiços do Backend Fastify
  async function loadCustomSpells() {
    try {
      setLoadingCustom(true);
      const data = await getCustomSpells();
      setCustomSpells(data);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoadingCustom(false);
    }
  }

  useEffect(() => {
    if (activeTab === 'custom') {
      loadCustomSpells();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomSpell(formData);
      setFormData({ name: '', category: 'Encantamento', effect: '' });
      setIsModalOpen(false);
      loadCustomSpells();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Cabeçalho da Página */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <Scroll color="var(--color-lavender)" size={24} /> Grimório de Feitiços
          </h1>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Consulte e meça feitiços favoritos ou registre novos encantamentos
          </p>
        </div>

        {activeTab === 'custom' && (
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: 'var(--color-blue)', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} /> Registrar Novo Feitiço
          </button>
        )}
      </div>

      {/* Navegação entre Abas */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('public')}
          style={{ padding: '0.75rem 1.25rem', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === 'public' ? '3px solid var(--color-lavender)' : '3px solid transparent', color: activeTab === 'public' ? '#fff' : 'var(--text-secondary)', fontWeight: activeTab === 'public' ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <BookOpen size={18} /> Acervo Geral
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          style={{ padding: '0.75rem 1.25rem', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === 'custom' ? '3px solid var(--color-lavender)' : '3px solid transparent', color: activeTab === 'custom' ? '#fff' : 'var(--text-secondary)', fontWeight: activeTab === 'custom' ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Wand2 size={18} /> Meus feitiços
        </button>
      </div>

      {/* --- ABA 1: API PÚBLICA (COM BOTÃO DE FAVORITAR E LINK SPELLDETAIL) --- */}
      {activeTab === 'public' && (
        loadingPublic ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-lavender)' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '0.5rem' }} />
            <p>Consultando acervo mágico oficial...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {publicSpells.map((spell) => {
              const isFav = favorites.includes(spell.id);

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ backgroundColor: 'rgba(150, 129, 217, 0.15)', color: 'var(--color-lavender)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {spell.attributes.category || 'Encantamento'}
                      </span>

                      {/* BOTÃO DE FAVORITAR INTEGRADO */}
                      <button
                        onClick={() => toggleFavorite(spell.id)}
                        title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                      >
                        <Star
                          size={18}
                          color="var(--color-lavender)"
                          fill={isFav ? 'var(--color-lavender)' : 'none'}
                        />
                      </button>
                    </div>

                    <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.25rem 0 0.5rem 0' }}>
                      {spell.attributes.name}
                    </h3>

                    <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1rem 0', opacity: 0.85 }}>
                      {spell.attributes.effect || 'Efeito conservado nos manuscritos de Hogwarts.'}
                    </p>
                  </div>

                  <Link
                    to={`/spells/${spell.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--color-navy)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      padding: '0.5rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    Ver Detalhes do Feitiço <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* --- ABA 2: FEITIÇOS CRIADOS NO BACKEND FASTIFY --- */}
      {activeTab === 'custom' && (
        loadingCustom ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-lavender)' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '0.5rem' }} />
            <p>Carregando feitiços...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {customSpells.map((spell) => (
              <div key={spell.id} style={{ backgroundColor: '#071533', border: '1px solid var(--color-purple-dark)', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ backgroundColor: 'var(--color-purple-dark)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{spell.category}</span>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>{spell.name}</h3>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', margin: 0, opacity: 0.9 }}>{spell.effect}</p>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modal de Cadastro do Backend */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Registrar Novo Feitiço</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Nome do Incantamento</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Lumifors" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Categoria</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}>
                  <option value="Encantamento">Encantamento</option>
                  <option value="Defesa">Defesa</option>
                  <option value="Ataque">Ataque</option>
                  <option value="Utilidade">Utilidade</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Efeito Mágico</label>
                <textarea required rows={3} value={formData.effect} onChange={(e) => setFormData({ ...formData, effect: e.target.value })} placeholder="Descreva o que o feitiço produz..." style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: 'var(--color-blue)', border: 'none', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cadastrar Feitiço</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}