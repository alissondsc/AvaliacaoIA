# Prompt para GitHub Copilot — BURGUER HOUSE

Analise primeiro toda a estrutura e os arquivos existentes. Implemente um MVP
acadêmico de cardápio digital **no projeto existente**, preservando dependências
e configurações úteis. Use JavaScript sem TypeScript, React e Vite no frontend;
Node.js, Express e CORS no backend. Não adicione banco de dados, autenticação,
pagamentos ou dependências sem necessidade.

O backend mantém seis produtos fictícios e expõe `GET /api/products` e
`POST /api/orders`. Valide pedidos vazios, produtos inexistentes e quantidades
inteiras positivas. Calcule subtotais e total exclusivamente com preços do
servidor e use HTTP 200, 201, 400, 404 e 500 adequadamente.

O frontend consome `http://localhost:3000/api/products` e envia pedidos para
`http://localhost:3000/api/orders`. Implemente filtros por categoria, catálogo,
carrinho com quantidades e totais automáticos, confirmação detalhada,
mensagens compreensíveis e layout responsivo branco/preto/laranja.

Separe rotas, modelo e serviço. Documente instalação, execução, estrutura e
testes no README e em `documentos/testes.md`. Execute testes, lint e build;
relate os arquivos alterados, resultados e erros encontrados.
