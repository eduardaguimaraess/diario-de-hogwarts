import { FastifyInstance } from 'fastify';
import { initialSpellsData, type CustomSpell } from '../data/spellsData.js';

let spellsDb: CustomSpell[] = [...initialSpellsData];

export async function spellsRoutes(server: FastifyInstance) {
  // GET /spells — Listar feitiços criados
  server.get('/spells', async (request, reply) => {
    return reply.status(200).send(spellsDb);
  });

  // POST /spells — Cadastrar novo feitiço no backend
  server.post('/spells', async (request, reply) => {
    const { name, category, effect } = request.body as any;

    if (!name || !category || !effect) {
      return reply.status(400).send({ error: 'Todos os campos (nome, categoria, efeito) são obrigatórios.' });
    }

    const newSpell: CustomSpell = {
      id: String(Date.now()),
      name,
      category,
      effect
    };

    spellsDb.push(newSpell);
    return reply.status(201).send(newSpell);
  });
}