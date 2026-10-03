import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { initialSchedule, ScheduleClass } from '../data/scheduleData.js';

// Copiamos os dados iniciais para uma variável mutável em memória
let schedule: ScheduleClass[] = [...initialSchedule];

// Tipos para os parâmetros e corpo das requisições (TypeScript)
interface Params {
  id: string;
}

interface ScheduleBody {
  subject: string;
  professor: string;
  classroom: string;
  time: string;
  dayOfWeek: string;
}

export async function scheduleRoutes(fastify: FastifyInstance) {
  
  // 1. GET /schedule — Listar todas as aulas
  fastify.get('/schedule', async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send(schedule);
  });

  // 2. GET /schedule/:id — Buscar aula específica pelo ID
  fastify.get('/schedule/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    const { id } = request.params;
    const item = schedule.find((s) => s.id === id);

    if (!item) {
      return reply.status(404).send({ error: 'Aula não encontrada na grade curricular de Hogwarts.' });
    }

    return reply.status(200).send(item);
  });

  // 3. POST /schedule — Cadastrar nova aula
  fastify.post('/schedule', async (request: FastifyRequest<{ Body: ScheduleBody }>, reply: FastifyReply) => {
    const { subject, professor, classroom, time, dayOfWeek } = request.body;

    // Validação básica de campos obrigatórios
    if (!subject || !professor || !classroom || !time || !dayOfWeek) {
      return reply.status(400).send({ error: 'Todos os campos (materia, professor, sala, horario e dia) são obrigatórios.' });
    }

    const newClass: ScheduleClass = {
      id: Date.now().toString(), // Gera um ID único em string com base no timestamp
      subject,
      professor,
      classroom,
      time,
      dayOfWeek
    };

    schedule.push(newClass);

    return reply.status(201).send(newClass);
  });

  // 4. PUT /schedule/:id — Atualizar aula existente
  fastify.put('/schedule/:id', async (request: FastifyRequest<{ Params: Params; Body: ScheduleBody }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { subject, professor, classroom, time, dayOfWeek } = request.body;

    const index = schedule.findIndex((s) => s.id === id);

    if (index === -1) {
      return reply.status(404).send({ error: 'Aula não encontrada para atualização.' });
    }

    // Atualiza os dados mantendo o mesmo ID
    schedule[index] = {
      id,
      subject: subject || schedule[index].subject,
      professor: professor || schedule[index].professor,
      classroom: classroom || schedule[index].classroom,
      time: time || schedule[index].time,
      dayOfWeek: dayOfWeek || schedule[index].dayOfWeek
    };

    return reply.status(200).send(schedule[index]);
  });

  // 5. DELETE /schedule/:id — Remover aula
  fastify.delete('/schedule/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    const { id } = request.params;
    const index = schedule.findIndex((s) => s.id === id);

    if (index === -1) {
      return reply.status(404).send({ error: 'Aula não encontrada para remoção.' });
    }

    schedule.splice(index, 1);

    return reply.status(204).send(); // 204 No Content para remoções bem-sucedidas
  });
}