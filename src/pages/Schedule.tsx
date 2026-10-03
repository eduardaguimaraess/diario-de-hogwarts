import React, { useEffect, useState } from 'react';
import { getSchedule, createScheduleClass, updateScheduleClass, deleteScheduleClass } from '../services/api';
import type { ScheduleClass } from '../types/hogwarts';
import { Calendar, Clock, MapPin, User, Plus, Trash2, Edit2, Loader2, AlertTriangle, Sparkles, X, BookOpen, CheckCircle, BookmarkPlus } from 'lucide-react';

export function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('Todos');

  // Controle de Abas: 'general' (Grade Geral) | 'my-plan' (Meu Plano do Aluno)
  const [activeTab, setActiveTab] = useState<'general' | 'my-plan'>('general');

  // Estado para o Plano de Estudos Personalizado do Aluno (Inicia lendo do localStorage)
  const [myPlan, setMyPlan] = useState<ScheduleClass[]>(() => {
    const savedPlan = localStorage.getItem('hogwarts_my_schedule_plan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });

  // Estados para o Modal de Criação / Edição do Backend
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    professor: '',
    classroom: '',
    time: '',
    dayOfWeek: 'Segunda-feira'
  });

  const daysOfWeek = ['Todos', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  // Carregar aulas da nossa API Fastify
  async function loadSchedule() {
    try {
      setLoading(true);
      setError(null);
      const data = await getSchedule();
      setSchedule(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  // Salvar alterações do "Meu Plano" no localStorage sempre que for atualizado
  useEffect(() => {
    localStorage.setItem('hogwarts_my_schedule_plan', JSON.stringify(myPlan));
  }, [myPlan]);

  // --- MEDIÇÃO DE PERFORMANCE ---
  console.time('⚡ Tempo de Filtro da Grade');
  const filteredSchedule = selectedDay === 'Todos'
    ? schedule
    : schedule.filter((item) => item.dayOfWeek === selectedDay);
  console.timeEnd('⚡ Tempo de Filtro da Grade');

  // Lógica de Adicionar/Remover do "Meu Plano"
  const handleAddToMyPlan = (item: ScheduleClass) => {
    if (myPlan.some(planItem => planItem.id === item.id)) {
      alert(`A disciplina "${item.subject}" já está no seu plano de estudos!`);
      return;
    }
    setMyPlan([...myPlan, item]);
  };

  const handleRemoveFromMyPlan = (id: string) => {
    setMyPlan(myPlan.filter(item => item.id !== id));
  };

  // Handlers para Formulário do CRUD Backend
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      subject: '',
      professor: '',
      classroom: '',
      time: '',
      dayOfWeek: 'Segunda-feira'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: ScheduleClass) => {
    setEditingId(item.id);
    setFormData({
      subject: item.subject,
      professor: item.professor,
      classroom: item.classroom,
      time: item.time,
      dayOfWeek: item.dayOfWeek
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateScheduleClass(editingId, formData);
      } else {
        await createScheduleClass(formData);
      }
      setIsModalOpen(false);
      loadSchedule();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: string, subject: string) => {
    if (confirm(`Tem certeza que deseja cancelar e remover a aula de "${subject}"?`)) {
      try {
        await deleteScheduleClass(id);
        // Remove também do plano pessoal se estiver lá
        handleRemoveFromMyPlan(id);
        loadSchedule();
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--color-lavender)' }}>
        <Loader2 className="animate-spin" size={36} style={{ marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.95rem' }}>Conectando ao servidor acadêmico de Hogwarts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: '#ff6b6b' }}>
        <AlertTriangle size={36} style={{ marginBottom: '1rem' }} />
        <p>Falha ao conectar ao servidor backend: {error}</p>
        <button
          onClick={loadSchedule}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-navy)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <Calendar color="var(--color-lavender)" size={24} /> Grade Curricular & Horários
          </h1>
          <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Gerenciamento oficial de disciplinas ({schedule.length} aulas cadastradas no servidor)
          </p>
        </div>

        {activeTab === 'general' && (
          <button
            onClick={handleOpenCreateModal}
            style={{
              backgroundColor: 'var(--color-blue)',
              color: '#fff',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Plus size={16} /> Cadastrar Nova Aula (API)
          </button>
        )}
      </div>

      {/* Navegação entre Abas (Tabs) */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('general')}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'general' ? '3px solid var(--color-lavender)' : '3px solid transparent',
            color: activeTab === 'general' ? '#fff' : 'var(--text-secondary)',
            fontWeight: activeTab === 'general' ? 600 : 400,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={18} /> Grade Geral de Hogwarts
        </button>

        <button
          onClick={() => setActiveTab('my-plan')}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'my-plan' ? '3px solid var(--color-lavender)' : '3px solid transparent',
            color: activeTab === 'my-plan' ? '#fff' : 'var(--text-secondary)',
            fontWeight: activeTab === 'my-plan' ? 600 : 400,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookmarkPlus size={18} /> Meu Plano de Estudos
          {myPlan.length > 0 && (
            <span style={{ backgroundColor: 'var(--color-purple-dark)', color: '#fff', borderRadius: '10px', padding: '0.1rem 0.5rem', fontSize: '0.75rem' }}>
              {myPlan.length}
            </span>
          )}
        </button>
      </div>

      {/* --- ABA 1: GRADE GERAL --- */}
      {activeTab === 'general' && (
        <>
          {/* Filtros por Dia da Semana */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: selectedDay === day ? 'var(--color-purple-dark)' : '#0b162c',
                  color: selectedDay === day ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Listagem de Aulas do Backend */}
          {filteredSchedule.length === 0 ? (
            <div style={{ backgroundColor: '#0b162c', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <Sparkles color="var(--color-lavender)" size={32} style={{ marginBottom: '0.5rem' }} />
              <p style={{ color: 'var(--color-lavender)', margin: 0 }}>Nenhuma aula agendada para {selectedDay}.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredSchedule.map((item) => {
                const isAlreadyInPlan = myPlan.some(p => p.id === item.id);

                return (
                  <div
                    key={item.id}
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span style={{ backgroundColor: 'rgba(150, 129, 217, 0.15)', color: 'var(--color-lavender)', border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {item.dayOfWeek}
                        </span>
                        
                        {/* Botões de Ação CRUD */}
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            title="Editar Aula no Backend"
                            style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--color-teal-light)', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.subject)}
                            title="Excluir Aula no Backend"
                            style={{ backgroundColor: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.75rem 0' }}>{item.subject}</h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.9, marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <User size={14} color="var(--color-lavender)" />
                          <span><strong>Docente:</strong> {item.professor}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <MapPin size={14} color="var(--color-lavender)" />
                          <span><strong>Local:</strong> {item.classroom}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={14} color="var(--color-lavender)" />
                          <span><strong>Horário:</strong> {item.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Adicionar ao Plano Pessoal */}
                    <button
                      onClick={() => handleAddToMyPlan(item)}
                      disabled={isAlreadyInPlan}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: isAlreadyInPlan ? 'rgba(44, 123, 145, 0.2)' : 'var(--color-navy)',
                        color: isAlreadyInPlan ? 'var(--color-teal-light)' : '#fff',
                        cursor: isAlreadyInPlan ? 'default' : 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      {isAlreadyInPlan ? (
                        <>
                          <CheckCircle size={14} /> Adicionado ao Meu Plano
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Adicionar ao Meu Plano
                        </>
                      )}
                    </button>

                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* --- ABA 2: MEU PLANO DE ESTUDOS --- */}
      {activeTab === 'my-plan' && (
        <div>
          <div style={{ backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Resumo do Seus Estudos</h3>
              <p style={{ color: 'var(--color-lavender)', margin: 0, fontSize: '0.85rem' }}>
                Você selecionou <strong>{myPlan.length} disciplinas</strong> para o seu cronograma pessoal.
              </p>
            </div>

            {myPlan.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Deseja limpar todo o seu plano de estudos?')) setMyPlan([]);
                }}
                style={{ backgroundColor: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Limpar Meu Plano
              </button>
            )}
          </div>

          {myPlan.length === 0 ? (
            <div style={{ backgroundColor: '#0b162c', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <BookmarkPlus color="var(--color-lavender)" size={36} style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>Seu plano de estudos está vazio!</h3>
              <p style={{ color: 'var(--color-lavender)', fontSize: '0.85rem', margin: 0 }}>
                Volte na aba <strong>Grade Geral de Hogwarts</strong> e clique no botão <code>+ Adicionar ao Meu Plano</code> nas disciplinas que deseja cursar.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {myPlan.map((item) => (
                <div
                  key={item.id}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ backgroundColor: 'var(--color-purple-dark)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {item.dayOfWeek}
                      </span>

                      <button
                        onClick={() => handleRemoveFromMyPlan(item.id)}
                        title="Remover do Meu Plano"
                        style={{ backgroundColor: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '0.2rem' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.75rem 0' }}>{item.subject}</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.9 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User size={14} color="var(--color-lavender)" />
                        <span><strong>Docente:</strong> {item.professor}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={14} color="var(--color-lavender)" />
                        <span><strong>Local:</strong> {item.classroom}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={14} color="var(--color-lavender)" />
                        <span><strong>Horário:</strong> {item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de Cadastro / Edição do Backend */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#071533', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#fff', fontSize: '1.3rem', margin: 0 }}>
                {editingId ? 'Editar Aula da Grade' : 'Cadastrar Nova Aula'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Nome da Disciplina</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ex: Defesa Contra as Artes das Trevas"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Professor Responsável</label>
                <input
                  type="text"
                  required
                  value={formData.professor}
                  onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                  placeholder="Ex: Prof. Severo Snape"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Sala / Localização</label>
                <input
                  type="text"
                  required
                  value={formData.classroom}
                  onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                  placeholder="Ex: Masmorras - Sala 3"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Horário</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="Ex: 08:00 - 09:40"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--color-lavender)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>Dia da Semana</label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0b162c', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                  >
                    {daysOfWeek.filter(d => d !== 'Todos').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--color-blue)', border: 'none', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  {editingId ? 'Salvar Alterações' : 'Confirmar Cadastro'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}