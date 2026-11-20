import type {
  FastifyReply,
  FastifyRequest
} from 'fastify';
import * as scheduleService from '../schedule/scheduleService.js';
import type {
  PaginationInput,
  ScheduleInput
} from '../schedule/scheduleService.js';

interface Params {
  id: string;
}

export async function list(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const classes = await scheduleService.listSchedule();
  return reply.status(200).send(classes);
}

export async function listPaginated(
  request: FastifyRequest<{ Querystring: PaginationInput }>,
  reply: FastifyReply
) {
  const result = await scheduleService.listSchedulePaginated(request.query);
  return reply.status(200).send(result);
}

export async function getById(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const item = await scheduleService.getScheduleById(request.params.id);

  if (!item) {
    return reply
      .status(404)
      .send({ error: 'Aula não encontrada na grade curricular de Hogwarts.' });
  }

  return reply.status(200).send(item);
}

export async function create(
  request: FastifyRequest<{ Body: ScheduleInput }>,
  reply: FastifyReply
) {
  const newClass = await scheduleService.createSchedule(request.body);
  return reply.status(201).send(newClass);
}

export async function update(
  request: FastifyRequest<{
    Params: Params;
    Body: Partial<ScheduleInput>;
  }>,
  reply: FastifyReply
) {
  const updatedClass = await scheduleService.updateSchedule(
    request.params.id,
    request.body
  );

  if (!updatedClass) {
    return reply
      .status(404)
      .send({ error: 'Aula não encontrada para atualização.' });
  }

  return reply.status(200).send(updatedClass);
}

export async function remove(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const removed = await scheduleService.deleteSchedule(request.params.id);

  if (!removed) {
    return reply
      .status(404)
      .send({ error: 'Aula não encontrada para remoção.' });
  }

  return reply.status(204).send();
}