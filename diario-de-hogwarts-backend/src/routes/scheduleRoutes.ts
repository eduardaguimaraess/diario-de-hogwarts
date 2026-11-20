import type { FastifyInstance } from 'fastify';
import * as scheduleController from '../modules/schedule/scheduleController.js';
import {
  createScheduleSchema,
  paginationSchema,
  updateScheduleSchema
} from '../modules/schedule/scheduleSchemas.js';

export async function scheduleRoutes(fastify: FastifyInstance) {
  fastify.get('/schedule', scheduleController.list);

  // Deve ficar antes de /schedule/:id para "paginated" não ser tratado como ID.
  fastify.get(
    '/schedule/paginated',
    { schema: paginationSchema },
    scheduleController.listPaginated
  );

  fastify.get('/schedule/:id', scheduleController.getById);

  fastify.post(
    '/schedule',
    { schema: createScheduleSchema },
    scheduleController.create
  );

  fastify.put(
    '/schedule/:id',
    { schema: updateScheduleSchema },
    scheduleController.update
  );

  fastify.delete('/schedule/:id', scheduleController.remove);
}