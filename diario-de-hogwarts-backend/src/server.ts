import Fastify from 'fastify';
import cors from '@fastify/cors';
import { scheduleRoutes } from './routes/scheduleRoutes.js';
import { spellsRoutes } from './routes/spellsRoutes.js';
import { potionsRoutes } from './routes/potionsRoutes.js';
import { database } from './database/connection.js';

const server = Fastify({
  logger: true
});

async function main() {
  await server.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  });

  server.get('/health', async () => {
    return {
      status: 'OK',
      message: 'Servidor de Hogwarts ativo e operacional!'
    };
  });

  await server.register(scheduleRoutes);
  await server.register(spellsRoutes);
  await server.register(potionsRoutes);

  try {
    await database.query('SELECT 1');
    console.log('Conexão com o MySQL estabelecida.');

    await server.listen({ port: 3333, host: '0.0.0.0' });
    console.log(
      '⚡ Servidor Fastify rodando na porta HTTP http://localhost:3333'
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();