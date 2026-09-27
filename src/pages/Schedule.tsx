import { useState } from 'react';
import type { ScheduleClass } from '../types/hogwarts';
import { Calendar, Clock, MapPin, User, GraduationCap } from 'lucide-react';

// Dados mockados das aulas em Hogwarts
const MOCK_SCHEDULE: ScheduleClass[] = [
  {
    id: '1',
    subject: 'Poções Avançadas',
    professor: 'Prof. Severo Snape',
    classroom: 'Masmorras - Sala 3',
    time: '08:00 - 09:30',
    dayOfWeek: 'Segunda-feira'
  },
  {
    id: '2',
    subject: 'Defesa Contra as Artes das Trevas',
    professor: 'Prof. Remus Lupin',
    classroom: 'Torre de Defesa - Sala 1C',
    time: '10:00 - 11:30',
    dayOfWeek: 'Segunda-feira'
  },
  {
    id: '3',
    subject: 'Herbologia',
    professor: 'Profª. Pomona Sprout',
    classroom: 'Estufa número 3',
    time: '13:30 - 15:00',
    dayOfWeek: 'Segunda-feira'
  },
  {
    id: '4',
    subject: 'Transfiguração',
    professor: 'Profª. Minerva McGonagall',
    classroom: 'Sala 1B',
    time: '15:30 - 17:00',
    dayOfWeek: 'Segunda-feira'
  }
];

export function Schedule() {
  const [classes] = useState<ScheduleClass[]>(MOCK_SCHEDULE);

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calendar color="var(--color-lavender)" size={24} /> Aulas do Dia
        </h1>
        <p style={{ color: 'var(--color-lavender)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Cronograma de disciplinas do período acadêmico atual
        </p>
      </div>

      {/* Grade de Aulas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {classes.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#0b162c',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1.15rem', margin: 0 }}>{item.subject}</h3>
                <GraduationCap size={20} color="var(--color-lavender)" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-teal-light)' }}>
                  <Clock size={16} />
                  <span><strong>Horário:</strong> {item.time}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <User size={16} color="var(--color-lavender)" />
                  <span><strong>Docente:</strong> {item.professor}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <MapPin size={16} color="var(--color-lavender)" />
                  <span><strong>Local:</strong> {item.classroom}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--color-lavender)', textAlign: 'right' }}>
              {item.dayOfWeek}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}