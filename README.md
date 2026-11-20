# Diário de Hogwarts

Projeto acadêmico desenvolvido para a disciplina de Programação para Sistemas Web.

**Integrante:** Eduarda Guimarães Monteiro

## Arquitetura

O backend utiliza organização por funcionalidades (*feature-based*). A funcionalidade `schedule` reúne controller, service, repository e schemas. Essa estrutura separa as responsabilidades e facilita a evolução do CRUD de aulas.

## Estrutura principal

```text
diario-de-hogwarts/
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Comunicação com o backend
│   └── types/            # Tipos TypeScript do frontend
└── diario-de-hogwarts-backend/
    └── src/
        ├── database/     # Conexão, schema.sql e seed.sql
        ├── modules/
        │   └── schedule/ # Controller, service, repository e schemas
        └── routes/       # Rotas do backend
```

## Fluxo da consulta paginada

A página `SchedulePaginated` chama o serviço da API no frontend. A requisição chega à rota do Fastify, que encaminha os dados ao controller, service e repository. O repository consulta o MySQL e o backend devolve os resultados em JSON.

## Como executar

### Banco de dados

1. Inicie o MySQL.
2. Execute `diario-de-hogwarts-backend/src/database/schema.sql`.
3. Execute `diario-de-hogwarts-backend/src/database/seed.sql` para inserir os dados iniciais.
4. Copie `.env.example` para `.env` na pasta `diario-de-hogwarts-backend` e preencha os dados da conexão:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=diario_hogwarts
```

### Backend

Em um terminal:

```bash
cd diario-de-hogwarts-backend
npm install
npm run dev
```

### Frontend

Em outro terminal, na pasta principal do projeto:

```bash
npm install
npm run dev
```

## Endpoint paginado de aulas

```http
GET /schedule/paginated?page=1&limit=5&search=Poções
```

Parâmetros:

- `page`: página solicitada.
- `limit`: quantidade de aulas por página.
- `search`: filtro por disciplina ou professor.

Exemplos de consulta:

```http
GET /schedule/paginated?page=1&limit=5&search=Poções
GET /schedule/paginated?page=2&limit=5&search=Feitiços
```

A resposta inclui os dados da página e informações de paginação, como total de registros e número total de páginas.
