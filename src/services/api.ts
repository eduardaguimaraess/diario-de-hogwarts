import type { Spell, Potion, ScheduleClass } from '../types/hogwarts';

const POTTER_DB_URL = 'https://api.potterdb.com/v1';
const BACKEND_URL = 'http://localhost:3333'; // Endereço do servidor Fastify

// --- CHAMADAS DA API PÚBLICA (Potter DB) ---
export async function getSpells(): Promise<Spell[]> {
  const response = await fetch(`${POTTER_DB_URL}/spells?page[size]=100`);
  if (!response.ok) {
    throw new Error('Falha ao carregar os feitiços de Hogwarts.');
  }
  const data = await response.json();
  return data.data;
}

export async function getSpellById(id: string): Promise<Spell> {
  const response = await fetch(`${POTTER_DB_URL}/spells/${id}`);
  if (!response.ok) {
    throw new Error('Feitiço não encontrado nos arquivos da biblioteca.');
  }
  const data = await response.json();
  return data.data;
}

export async function getPotions(): Promise<Potion[]> {
  const response = await fetch(`${POTTER_DB_URL}/potions?page[size]=30`);
  if (!response.ok) {
    throw new Error('Falha ao carregar o laboratório de poções.');
  }
  const data = await response.json();
  return data.data;
}

// --- CHAMADAS DA API PROPRIA (Fastify Backend - CRUD da N1) ---

// 1. GET — Listar todas as aulas
export async function getSchedule(): Promise<ScheduleClass[]> {
  const response = await fetch(`${BACKEND_URL}/schedule`);
  if (!response.ok) {
    throw new Error('Não foi possível conectar ao servidor de aulas de Hogwarts.');
  }
  return response.json();
}

// 2. POST — Criar nova aula
export async function createScheduleClass(data: Omit<ScheduleClass, 'id'>): Promise<ScheduleClass> {
  const response = await fetch(`${BACKEND_URL}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao cadastrar nova aula.');
  }

  return response.json();
}

// 3. PUT — Atualizar aula existente
export async function updateScheduleClass(id: string, data: Partial<ScheduleClass>): Promise<ScheduleClass> {
  const response = await fetch(`${BACKEND_URL}/schedule/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao atualizar aula.');
  }

  return response.json();
}

// 4. DELETE — Remover aula
export async function deleteScheduleClass(id: string): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/schedule/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao remover aula da grade.');
  }
}