import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { NewsItem, UserProfile } from '../types/hogwarts';
import { Scroll, Wand2, Shield, Flame, ChevronRight, Newspaper, Calendar, Sparkles, FlaskConical } from 'lucide-react';

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Ministério da Magia anuncia reforço de segurança nos arredores de Hogsmeade',
    category: 'Segurança',
    date: 'Hoje, 09:30',
    summary: 'Aurores foram destacados após relatos de atividades mágicas incomuns na Floresta Proibida.'
  },
  {
    id: '2',
    title: 'Torneio de Quadribol Intercasas começa na próxima sexta-feira',
    category: 'Esportes',
    date: 'Ontem, 16:45',
    summary: 'Grifinória e Sonserina se enfrentam na partida de abertura com portões abertos aos alunos.'
  },
  {
    id: '3',
    title: 'Novo estoque de ingredientes raros chega ao estoque de Poções',
    category: 'Acadêmico',
    date: '24 Set',
    summary: 'Pós de pedra da lua e acônito já estão disponíveis para aulas avançadas.'
  }
];

export function Home() {
  const userJson = localStorage.getItem('hogwarts_user');
  const user: UserProfile = userJson 
    ? JSON.parse(userJson) 
    : { username: 'Estudante', house: 'Grifinória', wand: 'Padrão' };

  const [news] = useState<NewsItem[]>(MOCK_NEWS);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.25rem' }}>Painel do Estudante</h1>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem' }}>Sessão ativa como {user.username}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
        
        {/* COLUNA DA ESQUERDA: Métricas + Atalhos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Cards de Métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-teal-light)', fontWeight: 600 }}>CASA VINCULADA</span>
                <Shield size={18} color="var(--color-lavender)" />
              </div>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>{user.house}</p>
            </div>

            <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-teal-light)', fontWeight: 600 }}>EQUIPAMENTO PRINCIPAL</span>
                <Wand2 size={18} color="var(--color-lavender)" />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', margin: 0 }}>{user.wand}</p>
            </div>
          </div>

          {/* Banner de Acesso ao Grimório */}
          <div style={{ backgroundColor: '#071533', border: '1px solid var(--color-purple-dark)', borderRadius: '16px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-lavender)', marginBottom: '0.5rem' }}>
              <Flame size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>MÓDULO DE CONSULTA</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Grimório Digital de Feitiços</h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem', opacity: 0.9 }}>
              Consulte o acervo oficial da biblioteca de Hogwarts para realizar pesquisas de encantamentos, categorias e efeitos mágicos.
            </p>
            <Link to="/spells" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-blue)', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>
              <Scroll size={16} /> Acessar Registros <ChevronRight size={14} />
            </Link>
          </div>

          {/* ATALHOS RÁPIDOS: Poções + Grade de Aulas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            
            {/* Atalho para Poções */}
            <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-lavender)' }}>
                  <FlaskConical size={18} />
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>Laboratório de Poções</h4>
                </div>
                <p style={{ color: 'var(--color-lavender)', margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>Receitas, elixires e ingredientes cadastrados no acervo.</p>
              </div>
              <Link to="/potions" style={{ marginTop: '1rem', backgroundColor: 'var(--color-navy)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content' }}>
                Ver Poções <ChevronRight size={14} />
              </Link>
            </div>

            {/* Atalho para Grade de Aulas */}
            <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-lavender)' }}>
                  <Calendar size={18} />
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>Grade Curricular</h4>
                </div>
                <p style={{ color: 'var(--color-lavender)', margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>Confira salas, horários e professores responsáveis do dia.</p>
              </div>
              <Link to="/schedule" style={{ marginTop: '1rem', backgroundColor: 'var(--color-navy)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content' }}>
                Ver Aulas <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>

        {/* COLUNA DA DIREITA: Profeta Diário (Sidebar) */}
        <aside style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <Newspaper color="var(--color-lavender)" size={22} />
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>O Profeta Diário</h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-teal-light)', fontWeight: 600 }}>EDIÇÃO ESPECIAL DE HOGWARTS</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {news.map((item) => (
              <article key={item.id} style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ backgroundColor: 'var(--color-purple-dark)', color: 'var(--color-lavender)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span style={{ color: 'var(--color-teal-light)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Calendar size={12} /> {item.date}
                  </span>
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.9rem', lineHeight: '1.3', margin: '0.4rem 0' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0, opacity: 0.85 }}>
                  {item.summary}
                </p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--color-lavender)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={12} /> Atualizado por Coruja Expressa
            </span>
          </div>
        </aside>

      </div>
    </div>
  );
}