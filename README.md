# NLW Journey - Nodejs

## Projeto

- API REST para gerenciamento de viagens, desenvolvida em Nodejs.

## Tecnologias

- TypeScript;
- Nodejs;
- Prisma ORM;
- SQLite;
- Fastify;
- Zod;
- Nodemailer;
- Docker.

## Instruções

- Criar o arquivo `.env` e preencher as variáveis de ambiente conforme sua necessidade:

```bash
cp .env.example .env
```

- Executar o comando abaixo para subir o container da aplicação:
  - Certifique-se de ter configurado servidores DNS para o Docker, no arquivo `daemon.json`.

```bash
docker compose up -d
```

- Aguarde alguns instantes e a API deverá estar acessível na URL informada no arquivo `.env`.
