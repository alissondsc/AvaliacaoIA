# BURGUER HOUSE — AvaliacaoIA

Aplicação acadêmica fictícia de cardápio digital para uma hamburgueria. O
frontend React consulta o catálogo servido pelo backend Express e permite montar
um carrinho e enviar pedidos. Produtos, preços e pedidos são apenas dados de
exemplo; não há banco de dados nem persistência durável.

## Objetivo e funcionalidades

- Apresentar seis produtos fictícios com descrição, categoria e preço.
- Filtrar produtos por categoria.
- Adicionar, remover e alterar quantidades no carrinho.
- Enviar pedidos à API e exibir a confirmação devolvida pelo servidor.
- Apresentar mensagens de carregamento e de erro.
- Usar o preço e o total calculados pelo backend na confirmação.

Não há autenticação, pagamento, entrega, controle de estoque ou painel
administrativo.

## Tecnologias e ferramentas

- **Backend:** Node.js, Express, JavaScript e CORS.
- **Frontend:** React, TypeScript, Vite e TanStack Start.
- **Estilos e componentes:** Tailwind CSS e componentes React.
- **Testes:** Node.js Test Runner, Vitest, Testing Library e Fetch API.
- **Ferramentas de desenvolvimento:** npm, Git/GitHub, VS Code, Lovable e
  Copilot.

O frontend usa TypeScript; os textos de planejamento históricos em `prompts/`
que mencionam JavaScript descrevem requisitos iniciais, não a implementação
atual.

## Arquitetura e comunicação

O backend e o frontend são aplicações separadas e podem ser iniciados em
terminais independentes. O backend expõe a API em `http://localhost:3000` e
habilita CORS. O frontend usa `VITE_API_URL` como endereço-base da API; o valor
padrão é `http://localhost:3000/api`.

- `GET /api/products` retorna os seis produtos definidos em
  `backend/src/models/productModel.js`.
- `POST /api/orders` recebe `{ "items": [{ "productId": 1, "quantity": 2 }] }`.
  O backend valida o pedido, procura os produtos no catálogo do servidor e
  calcula preços, subtotais e total. O preço enviado pelo navegador não é usado
  para calcular o pedido.
- Uma resposta válida tem HTTP 201 e o formato
  `{ "message": "...", "order": { "id": 1, "items": [...], "total": 25.9, "status": "Confirmado" } }`.
  Cada item inclui `productId`, `name`, `price`, `quantity` e `subtotal`.
- A tela de confirmação exibe a mensagem, o identificador, os itens e os
  valores retornados pelo backend. O carrinho só é limpo após o sucesso.
- Pedidos não são gravados em uma coleção nem em armazenamento durável. O
  identificador é mantido em memória pelo processo e reinicia quando o backend
  é reiniciado.

O backend rejeita carrinhos vazios, produtos inexistentes, quantidades que não
sejam inteiros positivos e valores que excedam o limite seguro. Esses erros de
validação retornam HTTP 400; rotas inexistentes retornam HTTP 404. JSON inválido
também retorna HTTP 400. A API atual implementa `GET` para produtos e `POST`
para pedidos; não há rotas `PUT` ou `DELETE`.

## Estrutura de diretórios

```text
AvaliacaoIA/
├── backend/
│   ├── src/
│   │   ├── models/productModel.js
│   │   ├── routes/{productRoutes.js,orderRoutes.js}
│   │   ├── services/{orderService.js,orderService.test.js}
│   │   └── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/{menu,ui}/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── routes/
│   │   └── test/
│   ├── legacy-vite/       # arquivos antigos preservados; não usados na execução atual
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── documentos/testes.md
├── prompts/
├── README.md
└── AGENTS.md
```

## Pré-requisitos

- Node.js 20.19+ ou 22.12+.
- npm (incluído com Node.js).
- Git é necessário para obter o código-fonte do repositório.

Repositório: [alissondsc/AvaliacaoIA](https://github.com/alissondsc/AvaliacaoIA).

## Instalação

Clone o repositório e instale as dependências em cada aplicação:

```powershell
git clone https://github.com/alissondsc/AvaliacaoIA.git
cd AvaliacaoIA/backend
npm install
cd ../frontend
npm install
```

## Variáveis de ambiente

O frontend usa `VITE_API_URL` como URL-base, incluindo o caminho `/api`. O valor
padrão já é `http://localhost:3000/api`; para personalizá-lo, copie o exemplo
para `.env.local` dentro de `frontend/`:

```powershell
cd frontend
Copy-Item .env.example .env.local
```

Edite `VITE_API_URL` conforme necessário. O backend não lê variáveis de
ambiente: a porta é definida como `3000` em `backend/server.js`.

## Como executar

Abra dois terminais na raiz do repositório.

**Terminal 1 — backend:**

```powershell
cd backend
npm run dev
```

A API ficará em [http://localhost:3000](http://localhost:3000). A rota `/`
retorna uma mensagem de status.

**Terminal 2 — frontend:**

```powershell
cd frontend
npm run dev
```

Abra o endereço local anunciado pelo Vite no terminal (normalmente
[http://localhost:8080](http://localhost:8080)). Se essa porta estiver em uso,
o Vite seleciona outra e informa o endereço.

Rotas da API:

- [GET http://localhost:3000/api/products](http://localhost:3000/api/products)
- [POST http://localhost:3000/api/orders](http://localhost:3000/api/orders)

O frontend e o backend iniciam separadamente, mas carregar o catálogo e enviar
pedidos pela interface requer que o backend esteja acessível.

## Limitações conhecidas

- Os produtos são exemplos fictícios e estão definidos em memória no backend.
- Os pedidos não têm persistência durável; o ID reinicia junto com o processo.
- A aplicação é um MVP local; não há URL de implantação configurada neste
  repositório.
- Não existem autenticação, pagamentos reais, entrega, estoque ou administração.
- O frontend usa a API local por padrão; em outro ambiente, configure
  `VITE_API_URL` e disponibilize um backend acessível.

## Testes e documentação

Os comandos e resultados verificados estão em
[documentos/testes.md](documentos/testes.md). Os prompts utilizados e os
resultados das tarefas documentadas estão em
[prompts/historico.md](prompts/historico.md).
