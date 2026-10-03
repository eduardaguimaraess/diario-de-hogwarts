# ⚡ Diário de Hogwarts

### 🪄 Portal Acadêmico Bruxo

> **Um portal acadêmico desenvolvido para transformar a rotina dos estudantes de Hogwarts em uma experiência digital interativa.**

O **Diário de Hogwarts** é uma aplicação web responsiva desenvolvida em **React + TypeScript + Vite**, criada no contexto da disciplina de **Programação para Sistemas Web**.

A proposta do projeto é unir conceitos de desenvolvimento web moderno com a temática do universo de Harry Potter, criando uma experiência semelhante a um sistema acadêmico real, mas ambientada na Escola de Magia e Bruxaria de Hogwarts.

O sistema permite que o estudante acesse seu ambiente acadêmico, consulte sua rotina, acompanhe notícias do **Profeta Diário**, explore feitiços e poções e organize seus conteúdos favoritos.

---

# 🏰 Funcionalidades

## 🔐 Autenticação

O sistema possui uma tela de entrada para o estudante acessar seu ambiente acadêmico.

Após a autenticação, o usuário é direcionado para sua área principal.

A autenticação utilizada no projeto possui finalidade acadêmica e de demonstração, não representando um sistema de autenticação de produção.

---

## 📊 Dashboard

A Dashboard funciona como o ponto central da aplicação.

Nela, o estudante encontra:

* informações do seu perfil;
* indicadores acadêmicos;
* atalhos para as principais áreas;
* informações da rotina escolar;
* notícias do Profeta Diário;
* acesso rápido aos conteúdos acadêmicos.

A ideia é reproduzir a experiência de um **dashboard acadêmico moderno**, utilizando a ambientação de Hogwarts.

---

## 🪄 Grimório de Feitiços

O Grimório permite consultar feitiços disponíveis na API utilizada pelo projeto.

É possível:

* pesquisar feitiços;
* visualizar informações;
* acessar detalhes;
* explorar diferentes registros;
* adicionar feitiços aos favoritos.

Os dados são obtidos de forma dinâmica através da **Potter DB API**.

---

## 🧪 Laboratório de Poções

O Laboratório de Poções segue a mesma proposta do Grimório, permitindo explorar informações relacionadas às poções do universo bruxo.

A funcionalidade utiliza dados provenientes da API externa e apresenta os resultados dentro da interface da aplicação.

---

## ⭐ Sistema de Favoritos

Os estudantes podem salvar determinados conteúdos para consultar posteriormente.

O sistema permite criar um pequeno **acervo pessoal**, facilitando o acesso aos feitiços favoritos.

Os dados dos favoritos possuem persistência local no navegador.

---

## 🗓️ Grade Curricular

A aplicação também apresenta uma grade acadêmica fictícia de Hogwarts.

A funcionalidade permite visualizar informações como:

* disciplina;
* professor;
* horário;
* local da aula;
* organização da rotina acadêmica.

A proposta é aproximar o projeto de um sistema acadêmico tradicional.

---

## 📰 Profeta Diário

A Dashboard apresenta uma área dedicada às notícias do **Profeta Diário**, criando uma experiência mais próxima de um portal completo.

A funcionalidade também ajuda a preencher a Dashboard com conteúdos relacionados ao universo temático do projeto.

---

# 🛠️ Tecnologias utilizadas

| Tecnologia          | Utilização                             |
| ------------------- | -------------------------------------- |
| ⚛️ React            | Construção da interface e componentes  |
| 🔷 TypeScript       | Tipagem e organização do código        |
| ⚡ Vite              | Ambiente de desenvolvimento e build    |
| 🧭 React Router DOM | Navegação e gerenciamento das rotas    |
| 🎨 CSS3             | Estilização da aplicação               |
| 🖼️ SVG             | Elementos gráficos e identidade visual |
| 🧩 Lucide React     | Ícones da interface                    |
| 🪄 Potter DB API    | Dados de feitiços e poções             |
| 📦 npm              | Gerenciamento das dependências         |

O projeto atualmente utiliza versões recentes de React, React Router, TypeScript e Vite, conforme definido no `package.json`.

---

# 🔌 Integração com API

Um dos principais objetivos do projeto foi trabalhar com **consumo de uma API externa**.

Para isso, foi utilizada a:

### 🪄 Potter DB API

```text
https://api.potterdb.com/v1
```

A API fornece dados relacionados ao universo de Harry Potter, utilizados principalmente nas áreas de:

* Feitiços;
* Poções.

Isso permite que a aplicação trabalhe com informações obtidas dinamicamente, em vez de depender exclusivamente de dados fixos no código.

---

# 🎨 Identidade visual

A interface foi desenvolvida para combinar a estética de um **sistema acadêmico moderno** com elementos visuais inspirados no universo bruxo.

### 🎨 Paleta principal

| Cor                | Código    | Utilização                         |
| ------------------ | --------- | ---------------------------------- |
| 🪻 Lavender Accent | `#9681D9` | Destaques e elementos de interação |
| 🟣 Purple Dark     | `#463181` | Elementos secundários              |
| 🔵 Deep Navy       | `#082674` | Cards e áreas principais           |
| 🌌 Background      | `#060C1A` | Fundo geral                        |
| 🔷 Action Blue     | `#3365CA` | Botões e ações                     |
| 🩵 Teal            | `#2C7B91` | Elementos complementares           |

### 🔤 Tipografia

**Cinzel**

Utilizada principalmente em títulos e elementos de destaque, contribuindo para a estética clássica e mágica.

**Plus Jakarta Sans**

Utilizada nos textos, botões, tabelas e demais elementos da interface, proporcionando uma aparência mais moderna e legível.

---

# 🛡️ Identidade de Hogwarts

O projeto também possui uma identidade visual própria.

O logotipo utilizado na Navbar é construído em **SVG**, representando as quatro casas de Hogwarts:

* 🦁 Grifinória
* 🐍 Sonserina
* 🦅 Corvinal
* 🦡 Lufa-Lufa

O elemento central utiliza a letra **H**, reforçando a identidade da escola.

---

# 📁 Estrutura do projeto

A estrutura principal do projeto segue a organização padrão de uma aplicação React com Vite:

```text
diario-de-hogwarts/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── ...
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

> A organização interna pode evoluir conforme novas funcionalidades sejam adicionadas ao projeto.

---

# 🚀 Como executar o projeto

## 📋 Pré-requisitos

Antes de iniciar, é necessário possuir:

* **Node.js**
* **npm**
* **Git**

Recomenda-se utilizar uma versão **LTS do Node.js**.

Para verificar se o Node.js e o npm estão instalados:

```bash
node -v
npm -v
```

---

## 1️⃣ Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/eduardaguimaraess/diario-de-hogwarts.git
```

Depois, entre na pasta:

```bash
cd diario-de-hogwarts
```

---

## 2️⃣ Instalar as dependências

Execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias para executar o projeto.

---

## 3️⃣ Iniciar o servidor de desenvolvimento

Execute:

```bash
npm run dev
```

O Vite iniciará o servidor local.

No terminal será exibido um endereço semelhante a:

```text
http://localhost:5173/
```

Abra esse endereço no navegador para acessar o Diário de Hogwarts.

---

# 🧰 Comandos disponíveis

O projeto possui alguns scripts configurados no `package.json`.

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento utilizando o Vite.

### Build

```bash
npm run build
```

Realiza a compilação do projeto para produção.

### Preview

```bash
npm run preview
```

Executa uma prévia da versão de produção gerada pelo build.

### Lint

```bash
npm run lint
```

Executa a ferramenta de análise estática configurada no projeto.

---


# 💡 Conceitos aplicados

Durante o desenvolvimento foram trabalhados conceitos importantes de desenvolvimento web, como:

* Componentização com React;
* Tipagem utilizando TypeScript;
* Gerenciamento de rotas;
* Interfaces responsivas;
* Consumo de API REST;
* Requisições assíncronas;
* Manipulação de dados;
* Persistência local;
* Organização de componentes;
* Estilização com CSS;
* Design de interfaces;
* Desenvolvimento de SPA;
* Separação de responsabilidades;
* Experiência do usuário.

---

# 🎓 Contexto acadêmico

O Diário de Hogwarts foi desenvolvido como um projeto acadêmico para colocar em prática conhecimentos de **Programação para Sistemas Web**.

A escolha do universo de Hogwarts surgiu como uma forma de transformar conceitos tradicionais de sistemas acadêmicos em uma aplicação mais criativa e visualmente envolvente.

A proposta foi utilizar a temática não apenas como decoração, mas como parte da própria experiência do usuário.

Assim, elementos como:

> **disciplinas → aulas de Hogwarts**
> **biblioteca → Grimório**
> **laboratório → Poções**
> **portal de notícias → Profeta Diário**
> **aluno → estudante de Hogwarts**

fazem parte da lógica de apresentação do sistema.

---

# 🧠 Principais desafios

Durante a construção da aplicação, alguns dos principais desafios envolveram:

### 🔹 Trabalhar com dados externos

Foi necessário compreender como realizar requisições para uma API e transformar os dados recebidos em elementos visuais dentro da aplicação.

### 🔹 Criar uma experiência consistente

As diferentes páginas precisavam compartilhar a mesma identidade visual e manter uma navegação coerente.

### 🔹 Organizar uma aplicação React

A utilização de componentes e rotas ajudou a estruturar a aplicação de forma mais organizada e reutilizável.

### 🔹 Unir criatividade e funcionalidade

Um dos objetivos foi evitar que o projeto fosse apenas uma aplicação temática, buscando manter características presentes em sistemas reais.

---

# 🔮 Possíveis evoluções

O projeto pode continuar evoluindo com novas funcionalidades, como:

* 👤 cadastro completo de estudantes;
* 🔑 autenticação com backend;
* 🗄️ banco de dados;
* 📅 criação e edição de horários;
* 📝 notas e avaliações;
* 🧑‍🏫 área para professores;
* 🏆 sistema de pontos por casa;
* 🦁 ranking entre casas;
* 💬 sistema de mensagens;
* 🔔 notificações acadêmicas;
* 📱 melhorias adicionais para dispositivos móveis;
* 🌐 publicação da aplicação em produção.

---

# ⚠️ Observações

Este projeto possui **finalidade acadêmica e demonstrativa**.

As informações acadêmicas apresentadas são fictícias e a autenticação disponível na aplicação não deve ser considerada equivalente a um sistema de segurança utilizado em ambientes reais.

A aplicação também depende da disponibilidade da API externa utilizada para os dados de feitiços e poções.

---

# 👩‍💻 Autoria

Desenvolvido por **Eduarda Guimarães Monteiro** como projeto acadêmico da área de Computação.

### Tecnologias principais

`React` · `TypeScript` · `Vite` · `React Router` · `CSS3` · `REST API`

---

<div align="center">

### ⚡ Diário de Hogwarts

**Transformando a rotina acadêmica em uma experiência mágica.**

🪄 📚 🧪 🏰 ⭐

</div>
