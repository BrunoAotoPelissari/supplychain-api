# Troubleshooting — SupplyChain API

Guia de diagnóstico e resolução dos principais problemas encontrados durante o desenvolvimento da SupplyChain API.

---

## 1. Docker — porta 3000 já está em uso

### Sintoma

Ao executar:

```powershell
docker compose up --build
```

aparece:

```text
Error response from daemon:
ports are not available: exposing port TCP 0.0.0.0:3000
...
bind: Normalmente é permitida apenas uma utilização de cada endereço de soquete
```

### Causa

A porta `3000` do Windows já estava sendo utilizada por outro processo.

Durante o desenvolvimento, um processo `node.exe` estava ocupando a porta.

### Diagnóstico

Verificar quem está usando a porta:

```powershell
netstat -ano | findstr :3000
```

Exemplo:

```text
TCP    0.0.0.0:3000    ...    LISTENING    19276
```

O último número é o PID do processo.

Descobrir o processo:

```powershell
tasklist /FI "PID eq 19276"
```

Exemplo:

```text
node.exe    19276
```

### Correção

Encerrar o processo:

```powershell
taskkill /PID 19276 /F
```

Verificar novamente:

```powershell
netstat -ano | findstr :3000
```

Se aparecer somente:

```text
TIME_WAIT    0
```

a porta não está mais sendo ocupada por um processo em escuta.

### Prevenção

Antes de subir o Docker, verificar se outro Node ou serviço local já está executando na porta:

```powershell
netstat -ano | findstr :3000
```

---

# 2. Docker — container `api` não está rodando

### Sintoma

Ao executar comandos como:

```powershell
docker compose exec api ...
```

aparece:

```text
service "api" is not running
```

### Causa

O container da API não conseguiu iniciar ou encerrou logo após ser criado.

Uma causa encontrada no projeto foi conflito de porta.

### Diagnóstico

Verificar todos os containers:

```powershell
docker ps -a
```

Verificar o estado pelo Compose:

```powershell
docker compose ps
```

Consultar os logs:

```powershell
docker compose logs api --tail=200
```

### Correção

Depois de identificar e corrigir a causa:

```powershell
docker compose down
docker compose up -d --build
```

---

# 3. Docker — warning sobre `version` no docker-compose.yml

### Sintoma

Ao executar Docker Compose:

```text
the attribute `version` is obsolete, it will be ignored
```

### Causa

Versões atuais do Docker Compose não precisam mais da propriedade `version` no arquivo Compose.

### Correção

Remover:

```yaml
version: "3.9"
```

do `docker-compose.yml`.

### Observação

Esse warning não impede o funcionamento do projeto. É uma melhoria de configuração, não uma falha da aplicação.

---

# 4. Dois ambientes de execução causando confusão de portas

Durante o desenvolvimento foram utilizados dois ambientes:

```text
Windows
API → localhost:3000
```

e:

```text
Docker
API → localhost:3001
PostgreSQL → localhost:5433
```

A configuração observada foi:

```text
API:
3001 → 3000

PostgreSQL:
5433 → 5432
```

Isso significa:

### A partir do Windows

A API pode acessar o banco usando:

```text
localhost:5433
```

### A partir do container Docker

A API deve acessar o banco usando o nome do serviço:

```text
db:5432
```

Não se deve usar:

```text
localhost:5433
```

dentro do container da API, porque `localhost` dentro do container aponta para o próprio container.

---

# 5. Prisma — `Can't reach database server`

### Sintoma

Erro:

```text
P1001: Can't reach database server at `db:5432`
```

ou:

```text
Can't reach database server at `localhost:5433`
```

### Diagnóstico

Primeiro verificar os containers:

```powershell
docker ps
```

Depois verificar a porta exposta:

```powershell
Test-NetConnection localhost -Port 5433
```

Resultado esperado:

```text
TcpTestSucceeded : True
```

### Configuração quando Prisma roda no Windows

Usar:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/supllychain"
```

### Configuração quando a aplicação roda dentro do Docker

Usar:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/supllychain"
```

### Regra importante

```text
Windows → localhost:5433
Docker API → db:5432
```

---

# 6. Prisma — schema não encontrado

### Sintoma

```text
Could not find Prisma Schema that is required for this command.
```

### Causa

O Prisma procura automaticamente:

```text
./prisma/schema.prisma
```

quando nenhuma localização diferente é informada.

### Correção

Manter o schema em:

```text
prisma/schema.prisma
```

ou informar explicitamente:

```powershell
npx prisma migrate dev --schema=.\prisma\schema.prisma
```

### Verificação

```powershell
Get-ChildItem -Recurse -Filter schema.prisma
```

No projeto, o schema válido deve estar em:

```text
C:\supplychain-api\prisma\schema.prisma
```

O arquivo:

```text
node_modules\.prisma\client\schema.prisma
```

é gerado pelo Prisma e não deve ser editado manualmente.

---

# 7. Prisma — erro de relacionamento 1:1

### Sintoma

```text
A one-to-one relation must use unique fields on the defining side.
```

### Causa

Um relacionamento que deveria ser 1:N foi modelado como 1:1.

Exemplo:

```text
Product
   ↓
Inventory
```

Um produto pode possuir registros de estoque em vários armazéns.

Portanto:

```text
Product 1 ───── N Inventory
```

e não:

```text
Product 1 ───── 1 Inventory
```

### Correção

No `Product`:

```prisma
inventories Inventory[]
```

No `Inventory`:

```prisma
productId String
product   Product @relation(fields: [productId], references: [id])
```

---

# 8. Prisma — relação sem campo inverso

### Sintoma

```text
The relation field ... is missing an opposite relation field
```

### Causa

Foi declarada uma relação em um modelo, mas o modelo relacionado não possui o campo correspondente.

Exemplo:

```prisma
model Order {
  product Product @relation(...)
}
```

mas `Product` não possui:

```prisma
orders Order[]
```

### Correção

Criar os dois lados da relação:

```prisma
model Product {
  orders Order[]
}
```

e:

```prisma
model Order {
  productId String
  product   Product @relation(fields: [productId], references: [id])
}
```

---

# 9. Prisma — banco sincronizado

### Sintoma

```text
Already in sync, no schema change or pending migration was found.
```

### Significado

Não é erro.

Significa que o banco já está sincronizado com o schema atual e não existe migration pendente.

O Prisma Client também pode ser regenerado:

```powershell
npx prisma generate
```

---

# 10. Prisma — validar conexão com o banco

Para testar a conexão diretamente pelo Prisma:

```powershell
npx prisma db pull
```

Uma conexão funcionando resulta em algo semelhante a:

```text
Datasource "db": PostgreSQL database "supllychain"
...
✔ Introspected 6 models
```

Esse teste é útil para separar:

```text
Problema de banco
```

de:

```text
Problema na aplicação Node
```

---

# 11. Express — `Cannot GET /`

### Sintoma

Ao acessar:

```text
http://localhost:3000/
```

aparece:

```text
Cannot GET /
```

### Causa

Não existe uma rota `GET /`.

### Correção opcional

Adicionar:

```ts
app.get("/", (req, res) => {
  res.send("API ONLINE");
});
```

Isso também funciona como um health check simples durante o desenvolvimento.

---

# 12. Express — `/api-docs` retorna `Cannot GET /api-docs`

### Causa

A rota do Swagger não foi registrada.

Isso aconteceu durante uma fase em que o carregamento do Swagger falhava antes de executar:

```ts
app.use("/api-docs", ...)
```

### Diagnóstico

Verificar se existe:

```ts
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
```

Também verificar erros no carregamento do documento Swagger.

---

# 13. Node/TypeScript — `app.listen is not a function`

### Sintoma

```text
TypeError: app.listen is not a function
```

### Causa

O objeto importado como `app` não era a instância do Express esperada.

Isso pode acontecer por incompatibilidade entre:

* `default export`
* CommonJS
* ESM
* imports incorretos
* build antigo em `dist`

### Exemplo esperado

No `app.ts`:

```ts
const app = express();

export default app;
```

No `server.ts`:

```ts
import app from "./infrastructure/express/app";
```

### Quando houver alterações estruturais

Limpar o build:

```powershell
Remove-Item -Recurse -Force dist
```

e gerar novamente:

```powershell
npm run build
```

---

# 14. TypeScript/Node — `Cannot find module ... supplier.routes.js`

### Sintoma

```text
Error: Cannot find module '../routes/supplier.routes.js'
```

### Causa

Durante o desenvolvimento com `ts-node-dev`, o código estava sendo executado diretamente de `src`, mas o import apontava para um arquivo `.js` que ainda não existia.

Arquivo real:

```text
src/infrastructure/routes/supplier.routes.ts
```

Import problemático:

```ts
import supplierRoutes from "../routes/supplier.routes.js";
```

### Correção

No ambiente com `ts-node-dev`:

```ts
import supplierRoutes from "../routes/supplier.routes";
```

### Regra

Prestar atenção à diferença entre:

```text
src → .ts
dist → .js
```

---

# 15. Swagger — tags aparecem, mas endpoints não aparecem

### Sintoma

O Swagger mostra:

```text
Suppliers
Products
Warehouses
Inventory
Orders
Shipments
```

mas não mostra:

```text
GET
POST
PUT
DELETE
```

### Causa

Os paths estavam definidos em arquivos externos:

```text
docs/swagger/paths/
```

por meio de:

```yaml
$ref: "./paths/suppliers.yaml"
```

mas o carregamento original utilizava `yamljs`, que não estava resolvendo corretamente esses `$ref` externos para o documento completo.

### Correção

Utilizar `@apidevtools/swagger-parser`:

```ts
import SwaggerParser from "@apidevtools/swagger-parser";
```

e:

```ts
const swaggerDocument = await SwaggerParser.bundle(swaggerPath);
```

Assim a estrutura modular pode permanecer:

```text
docs/
└── swagger/
    ├── swagger.yaml
    ├── paths/
    └── schemas/
```

---

# 16. Swagger — `ResolverError` / arquivo YAML não encontrado

### Sintoma

```text
Error opening file ...
ENOENT: no such file or directory
```

Exemplo:

```text
src/docs/swagger/paths/suppliers-by-id.yaml
```

### Causa

O `$ref` apontava para um arquivo cujo nome real era diferente.

Exemplo:

```yaml
$ref: "./paths/suppliers-by-id.yaml"
```

mas o arquivo podia ter outro nome.

### Diagnóstico

Listar os arquivos:

```powershell
Get-ChildItem src/docs/swagger/paths
```

### Correção

Os nomes do `$ref` devem corresponder exatamente aos arquivos existentes.

Exemplo:

```yaml
/suppliers/{id}:
  $ref: "./paths/suppliers-by-id.yaml"
```

deve corresponder a:

```text
paths/suppliers-by-id.yaml
```

---

# 17. Swagger — referência incorreta entre módulos

### Exemplo encontrado

Um arquivo chamado:

```text
suppliers-by-id.yaml
```

possuía inicialmente conteúdo referente a `Warehouse`.

Isso causava inconsistência semântica na documentação.

### Correção

Cada arquivo deve representar exclusivamente seu recurso.

```text
suppliers.yaml
        ↓
Supplier

products.yaml
        ↓
Product

warehouses.yaml
        ↓
Warehouse
```

Também verificar:

```yaml
tags:
```

e:

```yaml
$ref:
```

para garantir que apontam para o módulo correto.

---

# 18. Express — `Cannot GET /products/:id`

### Sintoma

```text
Cannot GET /products/123
```

### Causa

A documentação Swagger possuía:

```text
GET /products/{id}
```

mas a rota não havia sido implementada.

### Correção

Adicionar:

```ts
router.get("/:id", controller.getById);
```

e implementar:

```ts
getById = async (req: Request, res: Response) => {
  ...
};
```

### Importante

Se a rota existir, mas o produto não existir, o erro esperado é uma resposta controlada, por exemplo:

```json
{
  "error": "Produto não encontrado"
}
```

e não:

```text
Cannot GET /products/123
```

---

# 19. Express — `argument handler must be a function`

### Sintoma

```text
TypeError: argument handler must be a function
```

### Exemplo

Foi registrada:

```ts
router.put("/:id", controller.update);
```

antes de existir:

```ts
controller.update
```

### Causa

O Express recebeu `undefined` em vez de uma função.

### Correção

Garantir que Controller e Route tenham correspondência:

```ts
update = (...) => {
  ...
};
```

e:

```ts
router.put("/:id", controller.update);
```

O mesmo vale para:

```ts
delete
getById
create
```

---

# 20. Dados em memória são perdidos ao reiniciar

### Sintoma

Produtos desaparecem depois que a aplicação reinicia.

### Causa

O repository utiliza:

```ts
private products: Product[] = [];
```

Esse array existe apenas enquanto o processo Node está executando.

Ao reiniciar:

```text
products = []
```

novamente.

### Solução

Persistir os dados usando:

```text
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

Essa foi a razão para iniciar a migração dos módulos para Prisma.

---

# 21. Prisma — campo não existe no model

### Sintoma

```text
Unknown argument `phone`.
Available options are marked with ?
```

### Causa

A aplicação enviou:

```json
{
  "phone": "...",
  "active": true
}
```

mas o modelo `Supplier` não possuía esses campos.

### Correção

Atualizar o schema:

```prisma
model Supplier {
  id           String   @id @default(uuid())
  name         String
  contactEmail String
  phone        String?
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  products     Product[]
}
```

Depois criar migration:

```powershell
npx prisma migrate dev --name add_supplier_contact_fields
```

e regenerar:

```powershell
npx prisma generate
```

---

# 22. Não enviar UUID manualmente quando o Prisma gera automaticamente

### Evitar

```json
{
  "id": "sup-001",
  "name": "Seara Alimentos"
}
```

quando o schema contém:

```prisma
id String @id @default(uuid())
```

### Preferir

```json
{
  "name": "Seara Alimentos",
  "contactEmail": "contato@seara.com"
}
```

O Prisma gera o ID automaticamente.

---

# 23. SKU — identificação comercial do produto

SKU significa:

```text
Stock Keeping Unit
```

É um identificador usado pelo negócio para controle de estoque.

Exemplo:

```text
FRANGO-001
```

O SKU não precisa substituir o ID técnico do banco.

Uma aplicação pode usar:

```text
ID:
2ad162bc-4ac3-4068-a6d5-5947dd086a7d

SKU:
SEARA-FRANGO-001
```

---

# 24. Comandos úteis de diagnóstico

## Containers

```powershell
docker ps
```

```powershell
docker ps -a
```

```powershell
docker compose ps
```

## Logs

```powershell
docker compose logs api --tail=200
```

```powershell
docker compose logs db --tail=200
```

## Rebuild

```powershell
docker compose down
docker compose up -d --build
```

## Portas

```powershell
netstat -ano | findstr :3000
```

```powershell
Test-NetConnection localhost -Port 5433
```

## Prisma

```powershell
npx prisma generate
```

```powershell
npx prisma migrate dev
```

```powershell
npx prisma migrate status
```

```powershell
npx prisma db pull
```

```powershell
npx prisma validate
```

---

# 25. Checklist geral de diagnóstico

Quando alguma coisa quebrar, seguir esta ordem:

```text
1. A aplicação está rodando?
        ↓
2. A porta está disponível?
        ↓
3. Qual processo está usando a porta?
        ↓
4. Docker está com os containers UP?
        ↓
5. O banco está UP?
        ↓
6. A aplicação consegue acessar o banco?
        ↓
7. O Prisma consegue acessar o banco?
        ↓
8. A rota existe?
        ↓
9. Controller possui o método?
        ↓
10. Service possui o método?
        ↓
11. Repository possui o método?
        ↓
12. Swagger corresponde à implementação?
```

---

# 26. Regra prática para o ambiente atual

Durante o desenvolvimento local:

```text
Node / API
    ↓
localhost:3000

PostgreSQL
    ↓
localhost:5433
```

No Docker:

```text
API container
    ↓
db:5432
```

Mapeamento atual:

```text
Windows                Docker
-----------------------------------------
localhost:3000    →    api:3000
localhost:3001    →    api:3000

localhost:5433    →    db:5432
```

Não confundir a porta externa com a porta interna do container.

---

# 27. Princípio geral

Antes de alterar código, determinar em qual camada está o problema:

```text
Infraestrutura
     ↓
Docker / rede / portas
     ↓
Aplicação
     ↓
Express / rotas
     ↓
Arquitetura
     ↓
Controller / Service / Repository
     ↓
Persistência
     ↓
Prisma / PostgreSQL
     ↓
Documentação
     ↓
Swagger
```

Evitar alterar várias camadas simultaneamente. Isolar o problema primeiro e depois realizar a correção.

---

## Estado do projeto

No momento, a aplicação possui:

* Docker Compose
* PostgreSQL 16
* Prisma
* Express 5
* TypeScript
* Swagger/OpenAPI
* Arquitetura em camadas
* Modules para Product e Supplier

Próximas etapas planejadas:

* Finalizar CRUD de Supplier
* Migrar ProductRepository para Prisma
* Finalizar CRUD de Products
* Implementar Warehouse
* Implementar Inventory
* Implementar Orders
* Implementar Shipments
* Criar testes unitários e de integração
* Implementar CI/CD
* Evoluir segurança, auditoria e relatórios
