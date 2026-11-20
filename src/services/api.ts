import type {
  Spell,
  Potion,
  ScheduleClass,
  CustomSpell,
  CustomPotion
} from '../types/hogwarts';

const POTTER_DB_URL = 'https://api.potterdb.com/v1';
const BACKEND_URL = 'http://localhost:3333';

export interface PaginatedScheduleResponse {
  data: ScheduleClass[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

async function getErrorMessage(
  response: Response,
  fallbackMessage: string
): Promise<string> {
  try {
    const errorData = await response.json();
    return errorData.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

// Chamadas à API pública Potter DB

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
  const response = await fetch(`${POTTER_DB_URL}/potions?page[size]=100`);

  if (!response.ok) {
    throw new Error('Falha ao carregar o laboratório de poções.');
  }

  const data = await response.json();
  return data.data;
}

// Chamadas ao backend Fastify

export async function getSchedule(): Promise<ScheduleClass[]> {
  const response = await fetch(`${BACKEND_URL}/schedule`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar as aulas.');
  }

  return response.json();
}

export async function getPaginatedSchedule(
  page: number,
  limit: number,
  search: string
): Promise<PaginatedScheduleResponse> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search
  });

  const response = await fetch(
    `${BACKEND_URL}/schedule/paginated?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error('Não foi possível carregar a lista paginada de aulas.');
  }

  return response.json();
}

export async function createScheduleClass(
  data: Omit<ScheduleClass, 'id'>
): Promise<ScheduleClass> {
  const response = await fetch(`${BACKEND_URL}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, 'Erro ao cadastrar nova aula.')
    );
  }

  return response.json();
}

export async function updateScheduleClass(
  id: string,
  data: Partial<ScheduleClass>
): Promise<ScheduleClass> {
  const response = await fetch(`${BACKEND_URL}/schedule/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, 'Erro ao atualizar aula.')
    );
  }

  return response.json();
}

export async function deleteScheduleClass(id: string): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/schedule/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, 'Erro ao remover aula da grade.')
    );
  }
}

export async function getCustomSpells(): Promise<CustomSpell[]> {
  const response = await fetch(`${BACKEND_URL}/spells`);

  if (!response.ok) {
    throw new Error('Falha ao buscar feitiços cadastrados no servidor.');
  }

  return response.json();
}

export async function createCustomSpell(
  spell: Omit<CustomSpell, 'id'>
): Promise<CustomSpell> {
  const response = await fetch(`${BACKEND_URL}/spells`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spell)
  });

  if (!response.ok) {
    throw new Error('Falha ao cadastrar o feitiço no servidor.');
  }

  return response.json();
}

export async function getCustomPotions(): Promise<CustomPotion[]> {
  const response = await fetch(`${BACKEND_URL}/potions`);

  if (!response.ok) {
    throw new Error('Falha ao buscar poções do servidor.');
  }

  return response.json();
}

export async function createCustomPotion(
  potion: Omit<CustomPotion, 'id'>
): Promise<CustomPotion> {
  const response = await fetch(`${BACKEND_URL}/potions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(potion)
  });

  if (!response.ok) {
    throw new Error('Falha ao registrar a poção no servidor.');
  }

  return response.json();
}