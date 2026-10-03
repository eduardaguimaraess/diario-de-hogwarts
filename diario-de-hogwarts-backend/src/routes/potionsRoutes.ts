import { FastifyInstance } from 'fastify';
import { initialPotionsData, type CustomPotion } from '../data/potionsData.js';

let potionsDb: CustomPotion[] = [...initialPotionsData];

export async function potionsRoutes(server: FastifyInstance) {
  // GET /potions — Listar poções criadas
  server.get('/potions', async (request, reply) => {
    return reply.status(200).send(potionsDb);
  });

  // POST /potions — Cadastrar nova poção
  server.post('/potions', async (request, reply) => {
    const { name, difficulty, effect, ingredients } = request.body as any;

    if (!name || !effect) {
      return reply.status(400).send({ error: 'Nome e efeito são obrigatórios.' });
    }

    const newPotion: CustomPotion = {
      id: String(Date.now()),
      name,
      difficulty: difficulty || 'Intermediário',
      effect,
      ingredients: ingredients || 'Ingredientes secretos'
    };

    potionsDb.push(newPotion);
    return reply.status(201).send(newPotion);
  });
}