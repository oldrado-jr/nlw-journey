# NLW Journey - Nodejs

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

## Projeto

- API REST para gerenciamento de viagens, desenvolvida em Nodejs.

## Tecnologias e Ferramentas

- TypeScript;
- Nodejs;
- Prisma ORM;
- PostgreSQL;
- Fastify;
- Zod;
- Docker.

## Instruções

- Criar o arquivo `.env` e preencher as variáveis de ambiente conforme sua necessidade:

```bash
cp .env.example .env
```

- Executar o comando abaixo para subir o container da aplicação:
  - Certifique-se de especificar servidores DNS para o Docker. Saiba mais [clicando aqui](https://docs.docker.com/config/daemon/troubleshoot/#specify-dns-servers-for-docker).

```bash
docker compose up -d
```

- Aguarde alguns instantes e a API deverá estar acessível na URL informada no arquivo `.env`.
