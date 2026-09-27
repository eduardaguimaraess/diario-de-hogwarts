export interface Spell {
  id: string;
  attributes: {
    name: string;
    incantation: string | null;
    category: string | null;
    effect: string | null;
    light: string | null;
    image: string | null;
    wiki: string | null;
  };
}

// Estrutura para as Poções vinda da API pública
export interface Potion {
  id: string;
  attributes: {
    name: string;
    effect: string | null;
    ingredients: string | null;
    characteristics: string | null;
    difficulty: string | null;
    image: string | null;
    wiki: string | null;
  };
}

export interface UserProfile {
  username: string;
  house: 'Grifinória' | 'Sonserina' | 'Corvinal' | 'Lufa-Lufa';
  wand: string;
  favorites?: string[];
}

export interface ScheduleClass {
  id: string;
  subject: string;
  professor: string;
  classroom: string;
  time: string;
  dayOfWeek: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
}