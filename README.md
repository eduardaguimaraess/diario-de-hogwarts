<<<<<<< HEAD
# diario-de-hogwarts
Diário de Hogwarts — Portal acadêmico web para estudantes de magia desenvolvido em React + TypeScript + Vite. Aplicação responsiva com autenticação local, consumo da API pública Potter DB (feitiços e poções), grade de horários, acervo de favoritos e painel de notícias O Profeta Diário.
=======
# ⚡ Diário de Hogwarts — Portal Acadêmico Bruxo

O **Diário de Hogwarts** é um sistema web responsivo, dinâmico e tematizado, desenvolvido em **React, TypeScript e Vite** como parte do projeto evolutivo da disciplina de **Programação para Sistemas Web**. 

A aplicação foi projetada como um **portal de gestão acadêmica escolar** voltado para os alunos da Escola de Magia e Bruxaria de Hogwarts, integrando funcionalidades de autenticação local, consulta de rotinas escolares, painel de notícias, catálogo de feitiços e poções consumidos em tempo real de uma API externa, além de um sistema de favoritos com persistência de dados.

---

## 🎯 Propósito e Ideia do Sistema

O objetivo principal da aplicação é unir o ecossistema e a ambientação do universo bruxo a uma **arquitetura de software de dashboard acadêmico moderno**. 

Em vez de uma coleção de páginas estáticas ou um simples exibidor de JSON, o sistema entrega um **fluxo contínuo de uso**:
1. O estudante realiza a sua autenticação bruxa.
2. É direcionado a uma Dashboard com indicadores do seu perfil, atalhos de navegação e as notícias do dia do *Profeta Diário*.
3. Navega pelas disciplinas e acervos (Grimório de Feitiços e Laboratório de Poções), podendo realizar buscas dinâmicas, abrir detalhes de registros e salvar feitiços em seu acervo pessoal.
4. O aluno pode consultar a sua Grade Curricular com locais, horários e professores responsáveis.

---

## 🛠️ Tecnologias, Linguagens e Bibliotecas

| Tecnologia / Biblioteca | Função no Projeto |
| :--- | :--- |
| **React (v18+)** | Biblioteca JavaScript para construção de interfaces orientadas a componentes reutilizáveis. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática e interfaces, garantindo segurança e autocomplete durante o desenvolvimento. |
| **Vite** | Ferramenta de build extremamente rápida para o ecossistema frontend moderno. |
| **React Router DOM (v6+)** | Gerenciamento de rotas e navegação da SPA (Single Page Application). |
| **Lucide React** | Conjunto de ícones vetoriais modernos e leves (sem o uso de emojis). |
| **Potter DB API (`https://api.potterdb.com/v1`)** | API pública externa utilizada para consumo assíncrono dos dados de feitiços e poções. |
| **CSS3 Native (Variáveis & Flexbox/Grid)** | Estilização customizada inspirada em sistemas de dashboard modernos, utilizando paleta de cores mística e fontes tipográficas (*Cinzel* para títulos e *Plus Jakarta Sans* para o corpo de texto). |

---

## 🎨 Sistema de Design e Identidade Visual

O projeto foi estilizado com foco em alta legibilidade, contraste moderno e estética de dashboard profissional:
- **Paleta de Cores Mística:**
  - Lavender Accent: `#9681D9`
  - Purple Dark: `#463181`
  - Deep Navy / Cards: `#082674` / `#0b162c`
  - Action Blue: `#3365CA`
  - Teal Secondary: `#2C7B91` / `#0F4456`
  - Fundo Geral: `#060C1A`
- **Tipografia:**
  - Títulos e Destaques: *Cinzel* (Fonte Serifada clássica/mística).
  - Textos de Corpo, Botões e Tabelas: *Plus Jakarta Sans* (Fonte Sans-Serif moderna para sistemas web).
- **Logotipo Customizado:**
  - Brasão vetorial nativo (SVG) representando as quatro casas de Hogwarts (Grifinória, Sonserina, Corvinal e Lufa-Lufa) com a letra inicial H ao centro na Navbar.

---

## 🚀 Guia de Instalação do Zero (Passo a Passo)

Abaixo estão as instruções detalhadas para configurar o ambiente e executar a aplicação em uma **máquina limpa/zerada** que ainda não possui o Node.js instalado.

---

### Passo 1: Instalação do Ambiente (Node.js e Git)

#### 1.1. Instalar o Node.js
O Node.js é o ambiente necessário para rodar o gerenciador de pacotes (`npm`) e executar o Vite.
1. Acesse o site oficial do Node.js: **[https://nodejs.org/](https://nodejs.org/)**
2. Baixe e instale a versão **LTS (Long Term Support)** recomendada.
3. Siga o assistente de instalação padrão do seu sistema operacional.
4. Para confirmar que o Node e o NPM foram instalados corretamente, abra o seu terminal (Terminal/Prompt de Comando/PowerShell) e digite:
   ```bash
   node -v
   npm -v
>>>>>>> 83410a7 (feat: versão inicial do Diário de Hogwarts)
