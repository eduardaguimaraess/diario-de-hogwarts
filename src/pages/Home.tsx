import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { UserProfile } from '../types/hogwarts';
import { Scroll, Wand2, Shield, Flame, ChevronRight, Newspaper, Calendar, Sparkles, FlaskConical, Trophy, Award, Plus, Minus } from 'lucide-react';

interface NewsItemWithMedia {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  gifUrl: string;
}

interface HousePoints {
  name: string;
  points: number;
  color: string;
  icon: string;
}

// Notícias de O Profeta Diário enriquecidas com animações místicas (GIFs)
const MOCK_NEWS: NewsItemWithMedia[] = [
  {
    id: '1',
    title: 'Ministério da Magia reforça vigilância nos arredores de Hogsmeade',
    category: 'Segurança',
    date: 'Hoje, 09:30',
    summary: 'Aurores foram destacados após relatos de atividades mágicas incomuns e rastros de feitiços na Floresta Proibida.',
    gifUrl: 'https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OTh0aDl2MWJ4MjV2cXJycDlmYXI1enZuYWltMGExbHhhNzR2aW9oZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/m0Z1LPu6flQDS/200.webp' // Animação de feitiço / mistério
  },
  {
    id: '2',
    title: 'Torneio de Quadribol Intercasas começa na próxima sexta-feira',
    category: 'Esportes',
    date: 'Ontem, 16:45',
    summary: 'Grifinória e Sonserina se enfrentam na partida de abertura com torcidas empolgadas na arquibancada.',
    gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MmgzdWpkcGNjZHM1c3F6eG85ejAyc2Fsd3lwcHI4OGlyamt0MWhncSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DDOvL9Aq3ip32/100.webp' // Animação do Pomo de Ouro / Voo
  },
  {
    id: '3',
    title: 'Novo estoque de ingredientes raros chega ao laboratório de Poções',
    category: 'Acadêmico',
    date: '24 Set',
    summary: 'Pós de pedra da lua, acônito e vesículas de visgo já estão liberados para aulas avançadas do Prof. Slughorn.',
    gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhuMDJrYWRiOGtvMjJrMDNyZXp5bDYxbXF2MXN2NmpzMXY0dXFweSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AisOYaOZdrS1i/giphy.webp' // Caldeirão borbulhando
  }
];

export function Home() {
  const userJson = localStorage.getItem('hogwarts_user');
  const user: UserProfile = userJson 
    ? JSON.parse(userJson) 
    : { username: 'Estudante', house: 'Grifinória', wand: 'Padrão' };

  const [news] = useState<NewsItemWithMedia[]>(MOCK_NEWS);

  // --- REGRA DE PONTUAÇÃO DAS CASAS ---
  const [houses, setHouses] = useState<HousePoints[]>(() => {
    const saved = localStorage.getItem('hogwarts_house_points');
    if (saved) return JSON.parse(saved);

    return [
      { name: 'Grifinória', points: 180, color: '#d32f2f', icon: '🦁' },
      { name: 'Sonserina', points: 165, color: '#2e7d32', icon: '🐍' },
      { name: 'Corvinal', points: 150, color: '#1976d2', icon: '🦅' },
      { name: 'Lufa-Lufa', points: 140, color: '#fbc02d', icon: '🦡' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hogwarts_house_points', JSON.stringify(houses));
  }, [houses]);

  const handleUpdatePoints = (houseName: string, delta: number) => {
    setHouses(prevHouses =>
      prevHouses.map(h => {
        if (h.name === houseName) {
          const newPoints = Math.max(0, h.points + delta);
          return { ...h, points: newPoints };
        }
        return h;
      })
    );
  };

  const sortedHouses = [...houses].sort((a, b) => b.points - a.points);
  const leadingHouse = sortedHouses[0];
  const maxPoints = Math.max(...houses.map(h => h.points), 200);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.25rem' }}>Painel do Estudante</h1>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem' }}>Sessão ativa como {user.username}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
        
        {/* COLUNA DA ESQUERDA: Métricas + Taça das Casas + Banner Grimório + Atalhos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Cards de Métricas do Usuário */}
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
                <span style={{ fontSize: '0.8rem', color: 'var(--color-teal-light)', fontWeight: 600 }}>ESPECIFICAÇÃO DA VARINHA</span>
                <Wand2 size={18} color="var(--color-lavender)" />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', margin: 0 }}>{user.wand}</p>
            </div>
          </div>

          {/* SEÇÃO: TAÇA DAS CASAS & RANKING */}
          <div style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Trophy color="#FFD700" size={22} /> Taça das Casas
                </h3>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid #FFD700', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award color="#FFD700" size={14} />
                <span style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: 600 }}>
                  Líder: {leadingHouse.icon} {leadingHouse.name} ({leadingHouse.points} pts)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sortedHouses.map((house, index) => {
                const percentage = Math.round((house.points / maxPoints) * 100);

                return (
                  <div
                    key={house.name}
                    style={{
                      backgroundColor: '#0b162c',
                      border: index === 0 ? '1px solid #FFD700' : '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>{house.icon}</span>
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{house.name}</span>
                        {index === 0 && (
                          <span style={{ backgroundColor: '#FFD700', color: '#000', fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.35rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                            1º Lugar
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ color: 'var(--color-lavender)', fontWeight: 700, fontSize: '0.95rem' }}>
                          {house.points} <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-primary)', opacity: 0.7 }}>pts</span>
                        </span>

                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            onClick={() => handleUpdatePoints(house.name, -10)}
                            title="Retirar 10 pontos"
                            style={{ backgroundColor: 'rgba(255, 107, 107, 0.15)', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: '4px', padding: '0.2rem 0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Minus size={12} />
                          </button>
                          <button
                            onClick={() => handleUpdatePoints(house.name, 10)}
                            title="Conceder 10 pontos"
                            style={{ backgroundColor: 'rgba(51, 101, 202, 0.2)', border: '1px solid var(--color-blue)', color: '#fff', borderRadius: '4px', padding: '0.2rem 0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div style={{ width: '100%', backgroundColor: '#060c1a', borderRadius: '6px', height: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          backgroundColor: house.color,
                          transition: 'width 0.4s ease-in-out',
                          borderRadius: '6px'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
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

        {/* COLUNA DA DIREITA: Profeta Diário com Animações Mágicas (GIFs) */}
        <aside style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <Newspaper color="var(--color-lavender)" size={22} />
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>O Profeta Diário</h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-teal-light)', fontWeight: 600, letterSpacing: '0.5px' }}>
                EDIÇÃO ANIMADA DE HOGWARTS
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {news.map((item) => (
              <article
                key={item.id}
                style={{
                  backgroundColor: '#0b162c',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ backgroundColor: 'var(--color-purple-dark)', color: 'var(--color-lavender)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span style={{ color: 'var(--color-teal-light)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Calendar size={12} /> {item.date}
                  </span>
                </div>

                {/* --- MÓDULO VISUAL MÁGICO DO PROFETA DIÁRIO (GIF ANIMADO) --- */}
                <div
                  style={{
                    width: '100%',
                    height: '130px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(150, 129, 217, 0.3)',
                    backgroundColor: '#000',
                    position: 'relative'
                  }}
                >
                  <img
                    src={item.gifUrl}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'sepia(35%) contrast(110%) brightness(90%)', // Efeito estilizado vintage bruxo
                      opacity: 0.95
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '6px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'var(--color-lavender)',
                      fontSize: '0.6rem',
                      padding: '0.1rem 0.3rem',
                      borderRadius: '3px'
                    }}
                  >
                  </div>
                </div>

                <h4 style={{ color: '#fff', fontSize: '0.9rem', lineHeight: '1.3', margin: 0 }}>{item.title}</h4>
                
                <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0, opacity: 0.85 }}>
                  {item.summary}
                </p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--color-lavender)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={12} /> Atualizado por Rita Skeeter
            </span>
          </div>
        </aside>

      </div>
    </div>
  );
}