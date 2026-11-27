Atue como um desenvolvedor Full Stack Sênior e desenvolva um projeto acadêmico chamado BURGUER HOUSE.

CONTEXTO:

Estou desenvolvendo uma atividade acadêmica que consiste na criação de um cardápio digital interativo para uma lanchonete fictícia.

O projeto já possui uma estrutura inicial criada no VS Code.

Sua primeira tarefa é ANALISAR TODO O REPOSITÓRIO antes de realizar qualquer alteração.

Não crie outro projeto e não sobrescreva configurações existentes sem necessidade.

OBJETIVO:

Desenvolver um MVP funcional de cardápio digital, utilizando frontend e backend separados, com comunicação real entre as duas partes.

TECNOLOGIAS OBRIGATÓRIAS:

BACKEND:
- Node.js
- Express
- JavaScript
- CORS

FRONTEND:
- React
- Vite
- JavaScript
- CSS

Não utilizar TypeScript.
Não utilizar banco de dados.
Não implementar autenticação.
Não implementar pagamentos reais.

ESTRUTURA DO PROJETO:

Organize o projeto seguindo esta estrutura:

AvaliacaoIA/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   │
│   │   ├── models/
│   │   │   └── productModel.js
│   │   │
│   │   └── services/
│   │       └── orderService.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── documentos/
├── prompts/
├── .gitignore
└── README.md

BACKEND:

1. Criar seis produtos fictícios contendo:
- ID.
- Nome.
- Descrição.
- Preço.
- Categoria.

2. Criar a rota GET /api/products para retornar todos os produtos.

3. Criar a rota POST /api/orders para receber e processar pedidos.

4. Implementar validações:
- Impedir pedidos vazios.
- Validar existência dos produtos.
- Validar quantidades inteiras e positivas.
- Calcular os subtotais.
- Calcular o valor total.

5. O backend deverá calcular os preços utilizando os dados cadastrados no servidor, sem confiar nos preços enviados pelo frontend.

6. Utilizar os códigos HTTP adequados:
- 200 para consultas bem-sucedidas.
- 201 para pedidos criados.
- 400 para requisições inválidas.
- 404 para rotas inexistentes.
- 500 para erros internos.

7. Separar corretamente rotas, models e services.

FRONTEND:

Criar uma interface moderna para a hamburgueria fictícia BURGUER HOUSE.

IDENTIDADE VISUAL:
- Fundo branco.
- Preto como cor secundária.
- Laranja como cor de destaque.
- Design moderno.
- Interface intuitiva.
- Responsividade para computadores e celulares.

FUNCIONALIDADES:

RF01 - CATÁLOGO:
Exibir pelo menos seis produtos, contendo nome, preço, descrição e categoria.

Produtos:
- Classic Burger: R$ 25,90.
- Bacon Burger: R$ 32,90.
- Double Cheese: R$ 35,90.
- Batata Frita: R$ 15,00.
- Refrigerante: R$ 7,00.
- Milkshake: R$ 14,90.

RF02 - CATEGORIAS:
Criar filtros:
- Todos.
- Hambúrgueres.
- Porções.
- Bebidas.

RF03 - CARRINHO:
Permitir adicionar produtos ao carrinho.

RF04 - QUANTIDADES:
Permitir aumentar, diminuir e remover produtos.

RF05 - CÁLCULOS:
Calcular automaticamente os subtotais e o valor total.

RF06 - FINALIZAÇÃO:
Enviar o pedido para o backend através da rota POST /api/orders.

Exibir mensagem de confirmação contendo:
- Número do pedido.
- Produtos selecionados.
- Quantidades.
- Valor total.

RF07 - RESPONSIVIDADE:
Garantir funcionamento em computadores e dispositivos móveis.

RF08 - VALIDAÇÃO:
Impedir finalização de pedidos vazios e apresentar mensagens compreensíveis.

INTEGRAÇÃO:

O frontend deverá consumir os produtos diretamente da API Express.

Utilizar:
http://localhost:3000/api/products

Para finalizar pedidos, utilizar:
http://localhost:3000/api/orders

Não cadastrar os produtos novamente no frontend.

DOCUMENTAÇÃO:

Criar um README.md contendo:
- Descrição do projeto.
- Tecnologias utilizadas.
- Estrutura de pastas.
- Instruções para instalar dependências.
- Instruções para executar frontend e backend.
- Endereços locais da aplicação e API.

Criar também:
- documentos/testes.md
- prompts/1-planejamento.md
- prompts/2-lovable.md
- prompts/3-copilot.md

Em testes.md, documentar os testes funcionais e seus resultados.

IMPORTANTE SOBRE A IMPLEMENTAÇÃO:

1. Analise primeiro os arquivos existentes.
2. Preserve as configurações que já funcionam.
3. Não instale dependências desnecessárias.
4. Não utilize dados reais.
5. Não implemente funcionalidades fora do escopo.
6. Mantenha o código simples e organizado.
7. Utilize nomes de arquivos e variáveis em inglês.
8. Utilize comentários quando ajudarem na compreensão.
9. Verifique se o frontend e backend conseguem se comunicar.
10. Execute verificações e testes para identificar erros.

FORMA DE TRABALHO:

Antes de começar, apresente um breve diagnóstico da estrutura atual do repositório.

Depois, implemente as funcionalidades por etapas.

Ao terminar cada etapa:
- Informe quais arquivos foram criados ou modificados.
- Explique resumidamente o que foi implementado.
- Informe se encontrou algum erro.
- Apresente os testes realizados.

Não considere o projeto concluído enquanto os requisitos obrigatórios não estiverem implementados e testados.

Priorize um MVP funcional, simples e pronto para apresentação acadêmica.

## Auditoria
Faça uma auditoria final da integração entre frontend e backend do projeto AvaliacaoIA.

Não realize alterações inicialmente. Apenas analise e apresente um diagnóstico.

Verifique:

1. Se o frontend está consumindo corretamente GET /api/products.
2. Se o checkout está enviando corretamente POST /api/orders.
3. Se os campos enviados pelo frontend correspondem exatamente ao contrato esperado pelo backend.
4. Se os dados recebidos pelo backend são persistidos corretamente.
5. Se o tratamento de erros HTTP está adequado.
6. Se existe tratamento para indisponibilidade do backend.
7. Se as variáveis de ambiente estão configuradas corretamente.
8. Se o endereço da API está correto.
9. Se existem arquivos ou componentes desnecessários.
10. Se frontend e backend podem ser executados independentemente.

Não modifique o backend sem autorização.

Ao final, apresente:
- Problemas encontrados.
- Riscos de integração.
- Funcionalidades que estão funcionando.
- Funcionalidades que ainda precisam ser implementadas.
- Recomendações para a próxima etapa.

Não implemente novas funcionalidades nesta auditoria.