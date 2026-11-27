# Prompts utilizados e resultados

Este arquivo registra solicitações reais feitas durante o desenvolvimento e
atendimento do projeto. Ferramenta usada nos três registros: **Copilot no VS
Code (assistente usando Copilot SDK)**. Os resultados resumem o trabalho
efetivamente realizado.

Os outros arquivos desta pasta foram preservados como referências de
planejamento e prompts iniciais. Alguns descrevem requisitos históricos,
incluindo frontend em JavaScript sem TypeScript; a implementação atual usa
React com TypeScript, conforme o código e o README da raiz.

## 1. Integração do frontend Lovable

**Finalidade:** integrar a interface gerada pelo Lovable à estrutura atual do
projeto e conectar o frontend à API Express, preservando o backend.

**Prompt enviado:**

> Preciso integrar o código de interface desenvolvido pelo Lovable ao meu projeto existente chamado AvaliacaoIA.
>
> O projeto deve manter a seguinte estrutura:
>
> - backend/: contém toda a implementação do servidor Node.js com Express, rotas, models e services.
> - frontend/: contém a interface desenvolvida pelo Lovable utilizando React e Vite.
>
> Objetivos:
>
> 1. Integrar corretamente todos os arquivos do Lovable dentro da pasta frontend.
> 2. Preservar integralmente a implementação existente do backend.
> 3. Não excluir, sobrescrever ou modificar funcionalidades existentes do backend sem necessidade.
> 4. Verificar e ajustar as dependências do frontend no package.json.
> 5. Configurar a comunicação entre o frontend e a API do backend.
> 6. Utilizar as rotas existentes da API:
>
> - http://localhost:3000/api/products
> - http://localhost:3000/api/orders
>
> 7. Verificar se as requisições HTTP estão utilizando corretamente os métodos GET, POST, PUT e DELETE, conforme as funcionalidades implementadas na API.
> 8. Configurar corretamente o CORS, caso necessário.
> 9. Organizar os componentes, páginas, serviços e arquivos de estilos.
> 10. Garantir que o frontend e o backend possam ser executados independentemente.
>
> Antes de realizar qualquer alteração, analise toda a estrutura dos dois projetos.
>
> Não apague arquivos existentes sem necessidade.
>
> Ao finalizar, apresente um relatório informando:
>
> - Arquivos integrados.
> - Arquivos modificados.
> - Dependências instaladas.
> - Configurações realizadas.
> - Problemas encontrados.
> - Como executar o projeto completo.
>
> O objetivo é ter um único projeto AvaliacaoIA, com frontend e backend organizados em suas respectivas pastas.

**Resultado:** a interface foi organizada em `frontend/`, o cliente passou a
consumir `GET /api/products` e `POST /api/orders`, e o backend foi preservado.
O backend já habilitava CORS. A API atual não oferece `PUT` ou `DELETE`, então
essas operações não foram adicionadas.

## 2. Auditoria acadêmica do projeto

**Finalidade:** avaliar os fluxos de catálogo, carrinho e pedidos, a validação
do backend, as integrações visuais, os testes e a aderência ao escopo acadêmico,
sem modificar arquivos.

**Prompt enviado:**

> Faça uma análise completa do projeto AvaliacaoIA considerando os requisitos acadêmicos abaixo.
>
> OBJETIVO:
> Entregar um MVP funcional de uma aplicação de catálogo de produtos e realização de pedidos.
>
> REQUISITOS:
>
> 1. Aplicação funcional localmente.
> 2. Código-fonte organizado no GitHub.
> 3. README.md completo.
> 4. Registro de pelo menos três prompts utilizados.
> 5. Registro dos testes realizados e seus resultados.
> 6. Utilização exclusiva de produtos e informações fictícias.
>
> RESTRIÇÕES:
>
> - Não implementar autenticação.
> - Não implementar pagamento real.
> - Não implementar entrega.
> - Não implementar gerenciamento de estoque.
> - Não implementar painel administrativo.
>
> TAREFAS:
>
> 1. Analise todas as funcionalidades do frontend.
> 2. Analise todas as funcionalidades do backend.
> 3. Verifique se o catálogo apresenta os produtos corretamente.
> 4. Verifique se o carrinho funciona corretamente.
> 5. Verifique se o checkout envia pedidos válidos.
> 6. Verifique se o backend valida os dados recebidos.
> 7. Identifique funcionalidades visuais que não possuem integração real.
> 8. Identifique possíveis erros de comunicação entre frontend e backend.
> 9. Verifique se existem funcionalidades desnecessárias em relação ao escopo.
> 10. Verifique se os testes existentes cobrem os principais fluxos.
>
> IMPORTANTE:
> Não faça alterações nos arquivos.
> Não implemente novas funcionalidades.
> Não exclua componentes.
> Não modifique o backend.
>
> Ao finalizar, apresente:
>
> - Funcionalidades implementadas.
> - Funcionalidades funcionando corretamente.
> - Funcionalidades parcialmente implementadas.
> - Problemas encontrados.
> - Testes que ainda precisam ser executados.
> - Pendências para atender aos critérios de avaliação.
>
> O objetivo é verificar se o projeto está pronto para entrega acadêmica.

**Resultado:** a auditoria não alterou arquivos. Identificou, entre outros
pontos, que a confirmação do checkout apresentava somente o número do pedido,
embora o backend retornasse os itens e o total calculados no servidor. Esse
achado foi tratado pela solicitação seguinte.

## 3. Melhoria da confirmação do pedido

**Finalidade:** completar a confirmação usando os dados da resposta do backend,
sem recalcular totais no navegador e preservando o carrinho quando há erro.

**Prompt enviado:**

> Precisamos realizar uma melhoria pontual no projeto AvaliacaoIA.
>
> CONTEXTO:
>
> O projeto possui frontend em React + TypeScript e backend em Node.js + Express.
>
> O checkout já envia pedidos corretamente para POST /api/orders.
>
> Entretanto, após a criação do pedido, a interface apresenta apenas o número do pedido e não mostra os itens e o valor total confirmados pelo servidor.
>
> OBJETIVO:
>
> Melhorar a tela de confirmação do pedido.
>
> TAREFAS:
>
> 1. Analise o formato exato da resposta retornada pelo backend após a criação de um pedido.
> 2. Verifique os campos disponíveis no objeto order.
> 3. Ajuste o frontend para aproveitar os dados efetivamente retornados pelo backend.
> 4. Após a finalização bem-sucedida, apresentar:
>
> - Número do pedido.
> - Lista de produtos.
> - Quantidade de cada produto.
> - Valor total do pedido.
> - Mensagem de sucesso.
>
> 5. Os valores apresentados devem respeitar os valores calculados pelo backend, que é a fonte oficial dos preços e totais.
> 6. Não calcule novamente o total utilizando valores enviados pelo navegador.
> 7. Preserve o funcionamento atual do carrinho e do checkout.
> 8. Em caso de erro na criação do pedido, mantenha os produtos no carrinho.
>
> RESTRIÇÕES:
>
> - Não modificar regras de negócio do backend.
> - Não implementar banco de dados.
> - Não adicionar autenticação.
> - Não implementar pagamento.
> - Não alterar funcionalidades que já estão funcionando.
> - Manter o padrão visual atual desenvolvido pelo Lovable.
>
> TESTES:
>
> Após implementar, execute os testes existentes, o type-check e o build.
>
> Apresente um relatório com os arquivos modificados e os resultados dos testes.
>
> Faça somente as alterações necessárias para essa melhoria.

**Resultado:** o frontend passou a validar e exibir a resposta completa
`{ message, order }`, incluindo itens, quantidades, subtotais e total do
servidor. O carrinho só é limpo após sucesso; testes cobrem a confirmação e a
retenção do carrinho em erro. O backend permaneceu sem alterações.
