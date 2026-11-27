# Testes e resultados

## Validações automatizadas

Os comandos abaixo foram executados durante esta atualização da documentação.
Os resultados registram o código presente no repositório, sem alterações no
frontend ou backend.

| Verificação | Comando | Resultado obtido |
| --- | --- | --- |
| Backend | `cd backend; npm test` | Aprovado: 5 testes, 0 falhas. |
| Frontend | `cd frontend; npm test` | Aprovado: 5 testes em 3 arquivos, 0 falhas. |
| Type-check | `cd frontend; npx tsc --noEmit -p tsconfig.json` | Aprovado: código de saída 0. |
| Build | `cd frontend; npm run build` | Aprovado: build client, SSR e Nitro concluídos. |
| Lint | `cd frontend; npm run lint` | Concluído sem erros; 7 avisos de Fast Refresh. |

### Cobertura dos testes automatizados

Os cinco testes do backend verificam:

1. Cálculo de preços e totais a partir do catálogo do servidor, ignorando preço
   enviado no pedido.
2. Rejeição de carrinho vazio e de quantidades inválidas.
3. Rejeição de produto inexistente.
4. `GET /api/products` com HTTP 200, seis produtos e CORS; criação válida por
   `POST /api/orders` com HTTP 201 e total do servidor.
5. HTTP 400 para pedido inválido e HTTP 404 para rota desconhecida.

Os cinco testes do frontend, distribuídos em três arquivos, verificam:

1. `GET /api/products` e adaptação das categorias do catálogo.
2. `POST /api/orders`, payload com IDs e quantidades e leitura da resposta
   completa do backend.
3. Correspondência da rota `/` com uma página.
4. Exibição da mensagem, número, itens e total confirmados pelo backend.
5. Preservação dos itens no carrinho quando o pedido retorna erro.

### Avisos registrados

- **Lint:** sete avisos `react-refresh/only-export-components`, em
  `badge.tsx`, `button.tsx`, `form.tsx`, `navigation-menu.tsx`, `sidebar.tsx`,
  `toggle.tsx` e `use-cart.tsx`. O comando terminou sem erros.
- **Build:** aviso de que Vite já oferece resolução nativa de caminhos do
  `tsconfig` (plugin `vite-tsconfig-paths`) e aviso Nitro de que
  `inlineDynamicImports` é ignorado quando `codeSplitting` está configurado. O
  build terminou com sucesso.

## Testes funcionais manuais

Não há evidência reproduzível disponível no repositório nesta atualização
(como log, captura de tela ou relatório datado) que confirme a execução manual
dos cenários abaixo. Portanto, eles não são apresentados como aprovados; ficam
como roteiro pendente de execução e registro.

| Cenário | Resultado esperado | Resultado obtido |
| --- | --- | --- |
| Iniciar backend e frontend e abrir o catálogo | Seis produtos carregados de `GET /api/products`. | Não verificado manualmente; pendente. |
| Filtrar por todas as categorias | A lista acompanha a categoria selecionada. | Não verificado manualmente; pendente. |
| Adicionar, aumentar, diminuir e remover produtos | Quantidades e itens do carrinho refletem as ações. | Não verificado manualmente; pendente. |
| Conferir subtotal e total antes do envio | O resumo do carrinho mostra os valores correspondentes aos itens. | Não verificado manualmente; pendente. |
| Tentar finalizar sem itens | A interface impede o envio; a API rejeita lista vazia com HTTP 400. | Não verificado manualmente; pendente. |
| Enviar pedido válido | A interface exibe ID, itens, quantidades e total calculados pelo servidor. | Não verificado manualmente; pendente. |
| Enviar produto inexistente ou quantidade inválida | API responde HTTP 400 com mensagem de validação. | Não verificado manualmente; pendente. |
| Consultar rota inexistente | API responde HTTP 404. | Não verificado manualmente; pendente. |
| Conferir layout em viewport amplo e estreito | Conteúdo permanece utilizável sem rolagem horizontal indesejada. | Não verificado manualmente; pendente. |

Para executar um teste manual, siga a inicialização e os endereços descritos no
[README](../README.md). Registre data, cenário, resultado observado e, quando
possível, uma captura ou log antes de alterar o estado para aprovado.
