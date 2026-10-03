import Fastify from 'fastify';
import cors from '@fastify/cors';
import { scheduleRoutes } from './routes/scheduleRoutes';
import { spellsRoutes } from './routes/spellsRoutes.js';
import { potionsRoutes } from './routes/potionsRoutes.js';

// Inicializa o Fastify habilitando o logger
const server = Fastify({
  logger: true
});

async function main() {
  // Configura o CORS para permitir que o React converse com o Fastify
  // Configura o CORS liberando todos os métodos do CRUD (GET, POST, PUT, DELETE)
  await server.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  });

  // Rota de checagem de saúde da API (Health Check - Requisito N1)
  server.get('/health', async () => {
    return { status: 'OK', message: 'Servidor de Hogwarts ativo e operacional!' };
  });

  // Registra as rotas da nossa entidade principal
  await server.register(scheduleRoutes);
  await server.register(spellsRoutes);
  await server.register(potionsRoutes);

  // Inicia o servidor na porta 3333
  try {
    await server.listen({ port: 3333, host: '0.0.0.0' });
    console.log('⚡ Servidor Fastify rodando na porta HTTP http://localhost:3333');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();