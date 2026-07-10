# 🚚 SupplyChain API

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express](https://img.shields.io/badge/Express-Backend-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED)
![Swagger](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D)

Backend REST desenvolvido para simular um sistema moderno de gerenciamento de Supply Chain (SCM), inspirado em soluções utilizadas por empresas de logística, indústria e distribuição.

O projeto tem como objetivo demonstrar conhecimentos em desenvolvimento Back-End utilizando arquitetura em camadas, boas práticas de desenvolvimento, documentação de APIs, Docker e banco de dados relacional.

---

# 🎯 Objetivos

O projeto busca simular uma plataforma responsável por gerenciar toda a cadeia logística de uma empresa, incluindo:

- Cadastro de fornecedores
- Cadastro de produtos
- Controle de estoque
- Gestão de armazéns
- Controle de pedidos
- Rastreamento de transportes
- Relatórios logísticos
- Auditoria de operações

Além do domínio de negócio, o projeto também serve para aplicar conceitos como:

- Arquitetura em Camadas
- Clean Code
- SOLID
- REST API
- Prisma ORM
- PostgreSQL
- Docker
- OpenAPI / Swagger
- Testes Automatizados
- CI/CD

---

# 🛠 Tecnologias

## Backend

- Node.js
- TypeScript
- Express

## Banco de Dados

- PostgreSQL
- Prisma ORM

## Documentação

- Swagger UI
- OpenAPI 3.0

## Infraestrutura

- Docker
- Docker Compose

---

# 📂 Estrutura do Projeto

```
src
│
├── applications
│   ├── controllers
│   ├── repositories
│   ├── services
│   └── utils
│
├── config
│
├── docs
│   └── swagger
│       ├── paths
│       ├── schemas
│       └── swagger.yaml
│
├── domain
│   ├── inventory
│   ├── order
│   ├── product
│   ├── shipment
│   ├── supplier
│   └── warehouse
│
├── infrastructure
│   ├── express
│   ├── middleware
│   └── routes
│
├── modules
│   └── product
│       ├── controller
│       ├── repository
│       └── service
│
└── server.ts
```

---

# 🏗 Arquitetura

A API está sendo desenvolvida utilizando separação de responsabilidades.

```
HTTP Request
      │
      ▼
Routes
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

Essa arquitetura facilita manutenção, testes e evolução do projeto.

---

# 📖 Documentação

Após iniciar a aplicação:

```
http://localhost:3000/api-docs
```

A documentação é gerada utilizando Swagger/OpenAPI.

---

# 🚀 Executando o Projeto

## Clonar

```bash
git clone https://github.com/BrunoAotoPelissari/supplychain-api.git

cd supplychain-api
```

---

## Instalar dependências

```bash
npm install
```

---

## Configurar variáveis de ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/supplychain"

PORT=3000
```

---

## Iniciar containers

```bash
docker compose up -d
```

---

## Gerar Prisma Client

```bash
npx prisma generate
```

---

## Executar migrations

```bash
npx prisma migrate dev
```

---

## Rodar aplicação

```bash
npm run dev
```

---

# 📌 Funcionalidades

## Products

- ✅ Listar produtos
- ✅ Buscar produto por ID
- ✅ Criar produto
- 🚧 Atualizar produto
- 🚧 Remover produto

---

## Suppliers

- 🚧 Em desenvolvimento

---

## Warehouses

- 🚧 Em desenvolvimento

---

## Inventory

- 🚧 Em desenvolvimento

---

## Orders

- 🚧 Em desenvolvimento

---

## Shipments

- 🚧 Em desenvolvimento

---

# 🗺 Roadmap

## Banco de Dados

- [ ] Integrar ProductRepository ao Prisma
- [ ] Persistir dados no PostgreSQL
- [ ] Refatorar Suppliers para Prisma
- [ ] Refatorar Warehouses
- [ ] Refatorar Inventory
- [ ] Refatorar Orders
- [ ] Refatorar Shipments

---

## API

- [ ] CRUD completo de Products
- [ ] CRUD completo de Suppliers
- [ ] CRUD completo de Warehouses
- [ ] CRUD completo de Inventory
- [ ] CRUD completo de Orders
- [ ] CRUD completo de Shipments

---

## Relatórios

- [ ] Relatório de desempenho de armazéns
- [ ] Tempo médio de movimentação
- [ ] Taxa de ocupação
- [ ] Giro de estoque
- [ ] Produtos mais movimentados

---

## Monitoramento

- [ ] Rastreamento em tempo real de pedidos
- [ ] Rastreamento de transporte
- [ ] Dashboard operacional

---

## Segurança

- [ ] JWT
- [ ] Controle de Roles
- [ ] Auditoria de operações
- [ ] Histórico de alterações
- [ ] Logs centralizados
- [ ] Integração com SSO

---

## Qualidade

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Cobertura de testes

---

## DevOps

- [ ] Docker otimizado
- [ ] GitHub Actions (CI)
- [ ] Pipeline de Build
- [ ] Deploy Automatizado (CD)

---

# 💡 Melhorias Futuras

O objetivo é evoluir a API para um cenário mais próximo de sistemas corporativos utilizados por empresas de logística e indústria.

Entre as funcionalidades planejadas estão:

- Relatórios analíticos
- Indicadores de desempenho (KPIs)
- Auditoria completa
- Internacionalização (i18n)
- Dashboard operacional
- Monitoramento em tempo real
- Integração com serviços externos
- Arquitetura preparada para microsserviços

---

# 👨‍💻 Autor

**Bruno Aoto Pelissari**

GitHub:
https://github.com/BrunoAotoPelissari

LinkedIn:
*()*

---

# 📄 Licença

Projeto desenvolvido para fins de estudo, prática de arquitetura Back-End e portfólio.