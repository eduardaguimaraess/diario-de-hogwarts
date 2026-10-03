export interface CustomPotion {
  id: string;
  name: string;
  difficulty: string;
  effect: string;
  ingredients: string;
}

export const initialPotionsData: CustomPotion[] = [
  {
    id: '1',
    name: 'Elixir da Paz',
    difficulty: 'Avançado',
    effect: 'Acalma a ansiedade e abranda a agitação mental do bruxo.',
    ingredients: 'Pó de pedra da lua, xarope de heléboro e espinha de porco-espinho.'
  },
  {
    id: '2',
    name: 'Essência de Torta de Abóbora',
    difficulty: 'Iniciante',
    effect: 'Restaura a energia mágica e produz sensação imediata de aconchego.',
    ingredients: 'Sementes de abóbora mágica, canela de Ceilão e soro de leite.'
  }
];