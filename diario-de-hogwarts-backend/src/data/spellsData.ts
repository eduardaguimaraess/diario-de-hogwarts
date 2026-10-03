export interface CustomSpell {
  id: string;
  name: string;
  category: string;
  effect: string;
}

export const initialSpellsData: CustomSpell[] = [
  {
    id: '1',
    name: 'Lumifors',
    category: 'Encantamento',
    effect: 'Emite uma luz suave e cintilante na ponta da varinha por alguns minutos.'
  },
  {
    id: '2',
    name: 'Protego Maxima',
    category: 'Defesa',
    effect: 'Cria um escudo mágico expansivo que protege contra feitiços de grande porte.'
  }
];