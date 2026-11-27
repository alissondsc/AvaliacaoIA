# Planejamento — BURGUER HOUSE

Desenvolver um MVP acadêmico de cardápio digital usando a estrutura existente
do repositório, sem iniciar outro projeto nem sobrescrever configurações úteis.

## Requisitos

- Backend separado em Node.js, Express, JavaScript e CORS.
- Frontend separado em React, Vite, JavaScript e CSS.
- Sem TypeScript, banco de dados, autenticação ou pagamento real.
- Catálogo de seis produtos armazenados somente no backend.
- `GET /api/products` e `POST /api/orders`.
- Validar pedido vazio, existência de produto e quantidade inteira positiva.
- Calcular os preços no servidor e responder com códigos HTTP adequados.
- Interface branca, preta e laranja, filtros, carrinho, totais e confirmação.
- Layout responsivo para desktop e celular.
- README, testes funcionais e prompts de apoio documentados.

## Etapas

1. Inspecionar o repositório, dependências e configurações antes de editar.
2. Completar a API e testar seus casos válidos e inválidos.
3. Implementar a interface consumindo a API, sem duplicar os produtos.
4. Validar build, lint e comunicação entre frontend e backend.
5. Atualizar documentação com os comandos e resultados observados.

## Critérios de aceite

- O frontend mostra os produtos servidos pela API.
- O carrinho permite incluir, aumentar, diminuir e remover itens.
- O pedido é processado com preços confiáveis do servidor e retorna resumo.
- Erros de validação e rotas inválidas retornam respostas claras.
- Os comandos de teste, lint e build terminam sem falhas.
