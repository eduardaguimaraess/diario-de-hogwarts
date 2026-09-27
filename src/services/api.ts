import type { Spell, Potion } from '../types/hogwarts';

const BASE_URL = 'https://api.potterdb.com/v1';

// Busca a lista de feitiços
export async function getSpells(): Promise<Spell[]> {
  const response = await fetch(`${BASE_URL}/spells?page[size]=30`);
  if (!response.ok) {
    throw new Error('Falha ao carregar os feitiços de Hogwarts.');
  }
  const data = await response.json();
  return data.data;
}

// Busca os detalhes de um feitiço pelo ID
export async function getSpellById(id: string): Promise<Spell> {
  const response = await fetch(`${BASE_URL}/spells/${id}`);
  if (!response.ok) {
    throw new Error('Feitiço não encontrado nos arquivos da biblioteca.');
  }
  const data = await response.json();
  return data.data;
}

// Busca a lista de poções na API pública
export async function getPotions(): Promise<Potion[]> {
  const response = await fetch(`${BASE_URL}/potions?page[size]=30`);
  if (!response.ok) {
    throw new Error('Falha ao carregar o laboratório de poções.');
  }
  const data = await response.json();
  return data.data;
}