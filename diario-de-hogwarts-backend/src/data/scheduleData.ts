// Definimos o formato (tipo) que cada aula deve ter
export interface ScheduleClass {
    id: string;
    subject: string;
    professor: string;
    classroom: string;
    time: string;
    dayOfWeek: string;
}

// Este array funciona como o nosso "Banco de Dados em Memória"
// Como o Node mantém variáveis em memória enquanto roda, qualquer alteração (POST, PUT, DELETE) altera este array diretamente
export const initialSchedule: ScheduleClass[] = [
    {
        id: '1',
        subject: 'Defesa Contra as Artes das Trevas',
        professor: 'Prof. Severo Snape',
        classroom: 'SLA-101 (Masmorra 3)',
        time: '08:00 - 09:40',
        dayOfWeek: 'Segunda-feira'
    },
    {
        id: '2',
        subject: 'Poções Avançadas',
        professor: 'Prof. Horace Slughorn',
        classroom: 'Masp-02 (Masmorra Principal)',
        time: '10:00 - 11:40',
        dayOfWeek: 'Segunda-feira'
    },
    {
        id: '3',
        subject: 'Adivinhação',
        professor: 'Profa. Sybill Trelawney',
        classroom: 'Torre Norte - Sala 102',
        time: '14:00 - 15:40',
        dayOfWeek: 'Segunda-feira'
    },
    {
        id: '4',
        subject: 'Transfiguração',
        professor: 'Profa. Minerva McGonagall',
        classroom: 'Torre Ocidental - Sala 1B',
        time: '08:00 - 09:40',
        dayOfWeek: 'Terça-feira'
    },
    {
        id: '5',
        subject: 'História da Magia',
        professor: 'Prof. Cuthbert Binns',
        classroom: 'Aula 4F (Primeiro Andar)',
        time: '10:00 - 11:40',
        dayOfWeek: 'Terça-feira'
    },
    {
        id: '6',
        subject: 'Trato das Criaturas Mágicas',
        professor: 'Rubeus Hagrid',
        classroom: 'Arredores da Floresta Proibida',
        time: '13:30 - 15:10',
        dayOfWeek: 'Terça-feira'
    },
    {
        id: '7',
        subject: 'Herbologia',
        professor: 'Profa. Pomona Sprout',
        classroom: 'Estufa 3',
        time: '08:00 - 09:40',
        dayOfWeek: 'Quarta-feira'
    },
    {
        id: '8',
        subject: 'Feitiços',
        professor: 'Prof. Filius Flitwick',
        classroom: 'Aula 2E (Segundo Andar)',
        time: '10:00 - 11:40',
        dayOfWeek: 'Quarta-feira'
    },
    {
        id: '9',
        subject: 'Astronomia',
        professor: 'Profa. Aurora Sinistra',
        classroom: 'Torre de Astronomia',
        time: '20:00 - 21:40',
        dayOfWeek: 'Quarta-feira'
    },
    {
        id: '10',
        subject: 'Estudo dos Trouxas',
        professor: 'Profa. Charity Burbage',
        classroom: 'Aula 1C (Térreo)',
        time: '08:00 - 09:40',
        dayOfWeek: 'Quinta-feira'
    },
    {
        id: '11',
        subject: 'Runas Antigas',
        professor: 'Profa. Bathsheda Babbling',
        classroom: 'Torre Leste - Sala 6A',
        time: '10:00 - 11:40',
        dayOfWeek: 'Quinta-feira'
    },
    {
        id: '12',
        subject: 'Voo e Táticas de Quadribol',
        professor: 'Profa. Rolanda Hooch',
        classroom: 'Campo de Quadribol',
        time: '14:00 - 15:40',
        dayOfWeek: 'Sexta-feira'
    }
];