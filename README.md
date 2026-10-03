# ⚡ Diário de Hogwarts

### 🪄 Portal Acadêmico Bruxo

> Um portal acadêmico web inspirado em Hogwarts, desenvolvido para transformar a rotina escolar em uma experiência digital interativa.

O **Diário de Hogwarts** é uma aplicação web responsiva desenvolvida com **React, TypeScript e Vite**, criada no contexto da disciplina de **Programação para Sistemas Web**.

O projeto evoluiu de uma aplicação acadêmica temática para um sistema mais completo, com **autenticação local, dashboard, consumo de APIs, persistência no navegador, integração com backend próprio, operações CRUD, gerenciamento de favoritos, plano de estudos e sistema de pontuação das casas**.

A proposta é combinar conceitos de desenvolvimento web com a ambientação de Hogwarts, fazendo com que elementos como grade de aulas, biblioteca, laboratório e notícias façam parte da própria experiência de navegação.

---

# ✨ Visão geral

O fluxo principal da aplicação foi pensado para simular um portal acadêmico de Hogwarts:

1. 🔐 O estudante realiza seu acesso ao sistema.
2. 🏰 É direcionado para o **Painel do Estudante**.
3. 📊 Visualiza informações da casa, varinha, atalhos e a **Taça das Casas**.
4. 📰 Acompanha as notícias do **Profeta Diário**.
5. 🪄 Consulta o **Grimório de Feitiços**.
6. 🧪 Explora o **Laboratório de Poções**.
7. 🗓️ Consulta e gerencia a **Grade Curricular**.
8. ⭐ Salva feitiços no seu acervo pessoal.
9. 📚 Organiza disciplinas no seu **Plano de Estudos**.
10. ✍️ Pode trabalhar com registros personalizados através do backend próprio.

---

# 🏰 Funcionalidades

## 🔐 Autenticação acadêmica

A aplicação possui uma tela inicial de acesso na qual o estudante informa:

- Nome do estudante/bruxo;
- Casa de Hogwarts;
- Especificação da varinha.

As informações são armazenadas no `localStorage` e utilizadas pela aplicação para personalizar a experiência do estudante.

> ⚠️ A autenticação possui finalidade acadêmica e demonstrativa. Não se trata de um sistema de autenticação seguro para produção.

---

## 📊 Painel do Estudante

A **Dashboard** funciona como o centro da aplicação.

Ela apresenta:

- 🏠 Casa vinculada ao estudante;
- 🪄 Especificação da varinha;
- 🏆 **Taça das Casas**;
- 📈 Pontuação e ranking das quatro casas;
- 🪄 Acesso rápido ao Grimório;
- 🧪 Atalho para o Laboratório de Poções;
- 🗓️ Atalho para a Grade Curricular;
- 📰 Notícias do Profeta Diário.

A dashboard foi estruturada para reproduzir a experiência de um portal acadêmico moderno dentro da temática de Hogwarts.

---

## 🏆 Taça das Casas

Uma das novas funcionalidades do projeto é o sistema de pontuação das casas.

A Dashboard apresenta:

- 🦁 Grifinória;
- 🐍 Sonserina;
- 🦅 Corvinal;
- 🦡 Lufa-Lufa.

Cada casa possui uma pontuação e uma barra de progresso.

Também é possível:

- adicionar pontos;
- retirar pontos;
- visualizar a casa líder;
- acompanhar o ranking automaticamente.

As pontuações são persistidas no navegador através do `localStorage`, permitindo que as alterações permaneçam após a atualização da página.

---

## 📰 O Profeta Diário

A Dashboard possui uma área dedicada ao **Profeta Diário**.

As notícias são apresentadas em cards contendo:

- categoria;
- data;
- título;
- resumo;
- elemento visual animado.

A implementação atual utiliza conteúdos definidos na própria aplicação e elementos visuais em formato GIF para reforçar a ambientação temática.

---

# 🪄 Grimório de Feitiços

O Grimório permite consultar registros de feitiços obtidos através da **Potter DB API**.

### Acervo oficial

Os dados são carregados de forma assíncrona e apresentados em cards.

É possível:

- consultar feitiços;
- visualizar categoria;
- visualizar efeito;
- adicionar/remover favoritos;
- acessar uma página de detalhes;
- visualizar informações complementares do feitiço.

### 🔎 Página de detalhes

Cada feitiço possui uma rota própria:

```text
/spells/:id
```

A página de detalhes apresenta informações como:

- nome;
- incantação;
- categoria;
- emissão de luz;
- efeito;
- imagem, quando disponível.

### ✍️ Meus Feitiços

Além do acervo público, o sistema possui uma área para registros personalizados.

Através do backend próprio é possível:

- consultar feitiços cadastrados;
- registrar novos feitiços;
- informar nome;
- categoria;
- efeito.

Essa funcionalidade utiliza operações HTTP para comunicação com o backend.

---

# 🧪 Laboratório de Poções

O Laboratório de Poções segue uma estrutura semelhante ao Grimório.

## 📚 Acervo oficial

Os registros são obtidos dinamicamente da **Potter DB API**.

A interface permite:

- consultar poções;
- pesquisar por nome;
- visualizar efeito;
- visualizar ingredientes;
- visualizar dificuldade;
- visualizar características e demais informações disponíveis.

## ⚗️ Minhas Poções

O projeto também possui uma área para poções personalizadas.

Através do backend próprio é possível cadastrar:

- nome;
- dificuldade;
- efeito;
- ingredientes.

Assim, a aplicação trabalha tanto com dados externos quanto com dados cadastrados no próprio sistema.

---

# ⭐ Sistema de Favoritos

O estudante pode salvar feitiços do acervo oficial em seu acervo pessoal.

O sistema permite:

- adicionar um feitiço aos favoritos;
- remover um feitiço;
- visualizar os registros salvos em uma área específica.

Os favoritos são associados ao perfil armazenado no navegador através do `localStorage`.

---

# 🗓️ Grade Curricular

A Grade Curricular foi ampliada para trabalhar com dados provenientes do backend próprio.

Cada aula possui informações como:

- disciplina;
- professor;
- sala;
- horário;
- dia da semana.

## 🔎 Filtros

É possível filtrar a grade por:

- Todos;
- Segunda-feira;
- Terça-feira;
- Quarta-feira;
- Quinta-feira;
- Sexta-feira.

---

## ✏️ CRUD de aulas

A Grade Curricular possui operações de gerenciamento de registros:

- **GET** — consultar aulas;
- **POST** — cadastrar uma nova aula;
- **PUT** — editar uma aula existente;
- **DELETE** — remover uma aula.

As alterações são realizadas através da API própria desenvolvida com **Fastify**.

---

## 📚 Meu Plano de Estudos

Além da grade geral, o estudante possui uma área chamada **Meu Plano de Estudos**.

É possível:

- adicionar disciplinas da grade ao plano;
- remover disciplinas;
- visualizar a quantidade de disciplinas selecionadas;
- manter o plano salvo no navegador.

O plano personalizado utiliza `localStorage` para persistência.

---

# 🔌 Arquitetura de APIs

O projeto atualmente trabalha com **duas fontes de dados**.

## 🪄 API pública — Potter DB

Utilizada para dados do universo de Harry Potter, principalmente:

- Feitiços;
- Poções.

Endpoint base:

```text
https://api.potterdb.com/v1
```

As requisições são realizadas de forma assíncrona através dos serviços definidos em:

```text
src/services/api.ts
```

---

## ⚙️ API própria — Fastify

O projeto também possui integração com uma API própria utilizada para funcionalidades de gerenciamento de dados.

O frontend está configurado para acessar:

```text
http://localhost:3333
```

A API própria é utilizada para:

### Grade Curricular

```text
GET    /schedule
POST   /schedule
PUT    /schedule/:id
DELETE /schedule/:id
```

### Feitiços personalizados

```text
GET  /spells
POST /spells
```

### Poções personalizadas

```text
GET  /potions
POST /potions
```

> ⚠️ Para utilizar as funcionalidades que dependem do backend, o servidor Fastify precisa estar em execução na porta `3333`.

---

# 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| ⚛️ **React 19** | Construção da interface e componentes |
| 🔷 **TypeScript 6** | Tipagem estática e organização do código |
| ⚡ **Vite 8** | Desenvolvimento e build da aplicação |
| 🧭 **React Router DOM 7** | Rotas e navegação da SPA |
| 🎨 **CSS3** | Estilização e identidade visual |
| 🧩 **Lucide React** | Ícones da interface |
| 🪄 **Potter DB API** | Dados públicos de feitiços e poções |
| ⚙️ **Fastify API** | Backend para registros personalizados e grade |
| 💾 **LocalStorage** | Persistência de dados locais |
| 🧹 **Oxlint** | Análise estática e lint do código |
| 📦 **npm** | Gerenciamento de dependências |

As versões das principais ferramentas seguem o `package.json` atual do projeto.

---

# 🧩 Estrutura do projeto

A aplicação está organizada separando páginas, componentes, serviços, estilos e tipos:

```text
diario-de-hogwarts/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── Spells.tsx
│   │   ├── SpellDetail.tsx
│   │   ├── Favorites.tsx
│   │   ├── Schedule.tsx
│   │   └── Potions.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── styles/
│   │
│   ├── types/
│   │   └── hogwarts.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

# 🎨 Identidade visual

O projeto combina a estética de um sistema acadêmico moderno com elementos inspirados no universo mágico.

## 🎨 Paleta principal

| Cor | Código | Utilização |
|---|---|---|
| 🪻 Lavender Accent | `#9681D9` | Destaques e interações |
| 🟣 Purple Dark | `#463181` | Elementos secundários |
| 🔵 Deep Navy | `#082674` | Cards e áreas principais |
| 🌌 Background | `#060C1A` | Fundo geral |
| 🔷 Action Blue | `#3365CA` | Botões e ações |
| 🩵 Teal | `#2C7B91` | Elementos complementares |

## 🔤 Tipografia

### Cinzel

Utilizada em títulos e elementos de destaque, reforçando a estética clássica e mágica.

### Plus Jakarta Sans

Utilizada em textos, botões, tabelas e demais elementos da interface, priorizando legibilidade e uma aparência contemporânea.

---

# 🛡️ Identidade de Hogwarts

A aplicação possui uma identidade visual própria.

O logotipo utilizado na navegação é construído em **SVG** e representa as quatro casas:

- 🦁 Grifinória;
- 🐍 Sonserina;
- 🦅 Corvinal;
- 🦡 Lufa-Lufa.

A letra **H** ocupa a região central do brasão, reforçando a identidade de Hogwarts.

---

# 🧠 Conceitos de desenvolvimento aplicados

O projeto permitiu trabalhar conceitos importantes de desenvolvimento web:

- Componentização com React;
- TypeScript e tipagem de dados;
- React Hooks (`useState` e `useEffect`);
- Gerenciamento de rotas;
- SPA — Single Page Application;
- Consumo de APIs REST;
- Requisições assíncronas;
- Integração entre frontend e backend;
- Operações CRUD;
- Manipulação de dados;
- Persistência com `localStorage`;
- Filtros e busca de registros;
- Formulários;
- Modais;
- Estados de carregamento;
- Tratamento de erros;
- Organização de serviços;
- Interfaces responsivas;
- Design de interfaces;
- Separação de responsabilidades;
- Experiência do usuário.

---

# 🚀 Como executar o projeto

## 📋 Pré-requisitos

Para executar o frontend, é necessário possuir:

- **Node.js** — recomenda-se a versão LTS;
- **npm**;
- **Git**.

Para verificar a instalação:

```bash
node -v
npm -v
git --version
```

---

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/eduardaguimaraess/diario-de-hogwarts.git
```

Depois:

```bash
cd diario-de-hogwarts
```

---

## 2️⃣ Instalar as dependências

```bash
npm install
```

---

## 3️⃣ Executar o frontend

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento.

Normalmente, a aplicação estará disponível em:

```text
http://localhost:5173/
```

---

# ⚙️ Backend

Algumas funcionalidades dependem da API própria configurada no frontend como:

```text
http://localhost:3333
```

Portanto, para utilizar completamente:

- Grade Curricular;
- cadastro/edição/exclusão de aulas;
- Feitiços personalizados;
- Poções personalizadas;

é necessário executar o backend Fastify correspondente.

Sem o backend, as funcionalidades que dependem de `localhost:3333` não conseguirão carregar ou persistir seus dados.

---

# 🧰 Scripts disponíveis

## Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento do Vite.

## Build

```bash
npm run build
```

Executa a verificação TypeScript e gera a versão de produção da aplicação.

## Preview

```bash
npm run preview
```

Executa uma prévia local do build de produção.

## Lint

```bash
npm run lint
```

Executa o **Oxlint** para análise estática do código.

---

# 🎓 Contexto acadêmico

O Diário de Hogwarts foi desenvolvido como projeto acadêmico para aplicação prática dos conhecimentos estudados em **Programação para Sistemas Web**.

A temática de Hogwarts foi utilizada como uma forma de transformar conceitos comuns de sistemas acadêmicos em uma experiência mais criativa e visualmente envolvente.

A ideia é que a temática não seja apenas decorativa, mas esteja integrada à lógica da aplicação:

```text
Aluno
   ↓
Estudante de Hogwarts

Dashboard
   ↓
Painel do Estudante

Biblioteca
   ↓
Grimório de Feitiços

Laboratório
   ↓
Laboratório de Poções

Grade acadêmica
   ↓
Grade Curricular de Hogwarts

Portal de notícias
   ↓
O Profeta Diário

Ranking acadêmico
   ↓
Taça das Casas
```

---

# 🧠 Principais desafios

Durante a evolução do projeto, alguns dos principais desafios foram:

### 🔹 Integração com APIs

Foi necessário compreender como consumir dados externos e transformar respostas de APIs em componentes da interface.

### 🔹 Integração frontend + backend

A aplicação passou a trabalhar também com uma API própria, exigindo a implementação de requisições `GET`, `POST`, `PUT` e `DELETE`.

### 🔹 Persistência de dados

O projeto utiliza `localStorage` para manter informações do estudante, favoritos, pontuação das casas e plano de estudos.

### 🔹 Gerenciamento de estados

A aplicação utiliza estados para controlar carregamentos, filtros, formulários, abas, favoritos, dados do usuário e interações da interface.

### 🔹 Organização da aplicação

A separação entre páginas, serviços e tipos contribui para uma estrutura mais organizada e facilita a manutenção e evolução do sistema.

### 🔹 Unir criatividade e funcionalidade

Um dos objetivos do projeto foi utilizar a temática de Hogwarts como parte da experiência, sem deixar de trabalhar conceitos presentes em aplicações web reais.

---

# 🔮 Possíveis evoluções

Entre as possibilidades futuras para o projeto estão:

- 🔐 autenticação real com backend;
- 👤 cadastro completo de estudantes;
- 🗄️ banco de dados persistente;
- 🔑 gerenciamento de usuários e permissões;
- 👨‍🏫 área específica para professores;
- 📝 notas e avaliações;
- 📚 biblioteca acadêmica;
- 💬 sistema de mensagens;
- 🔔 notificações;
- 🏆 evolução do sistema de pontos das casas;
- 📱 melhorias adicionais para dispositivos móveis;
- 🌐 publicação da aplicação em produção;
- 🧪 expansão das operações CRUD para outros módulos.

---

# ⚠️ Observações

Este projeto possui **finalidade acadêmica e demonstrativa**.

Os dados acadêmicos utilizados são fictícios e a autenticação disponível atualmente não deve ser considerada um mecanismo de segurança para ambientes reais.

O funcionamento de algumas funcionalidades também depende da disponibilidade:

- da **Potter DB API**;
- do **backend Fastify local**, quando a funcionalidade utiliza `http://localhost:3333`.

---

# 👩‍💻 Autoria

Desenvolvido por **Eduarda Guimarães Monteiro** como projeto acadêmico na área de Computação.

### Tecnologias principais

`React` · `TypeScript` · `Vite` · `React Router` · `Fastify` · `REST API` · `CSS3`

---

<div align="center">

## ⚡ Diário de Hogwarts

**Transformando a rotina acadêmica em uma experiência mágica.**

🪄 📚 🧪 🏰 ⭐

</div>
