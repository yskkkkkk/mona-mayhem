<!-- l10n-sync: source-file="README.md" -->
🌐 [English](README.md) | [Español](README.es.md) | Português (Brasil) | [한국어](README.ko.md)

# Mona Mayhem — Arena de Batalha de Contribuições do GitHub

Compare dois usuários do GitHub em uma batalha de arcade retrô. O app de servidor Astro busca os dados de contribuição por meio de um proxy de API no servidor e exibe gráficos de contribuição, sequências e o vencedor da batalha.

## Executar localmente

Requer Node.js e npm. Na raiz do repositório:

```bash
npm ci
npm run dev
```

Abra [http://localhost:4321](http://localhost:4321), informe dois nomes de usuário do GitHub e inicie uma batalha.

Para verificar um build de produção:

```bash
npm run build
npm run preview
```

Se o preview deste app já estiver em execução, interrompa-o antes de executar `npm run build` e reinicie-o com `npm run preview` depois que o build terminar. Um processo de preview antigo pode referenciar URLs de CSS/JS com hash desatualizadas, causando erros 404 e quebrando estilos ou scripts.

## Recursos

- Gráficos de contribuição lado a lado, com tooltips diários e legendas de níveis de cor
- Totais de contribuições, períodos, maiores sequências e um banner de vencedor
- Tema neon alternativo, histórico de batalhas recentes, som sintetizado opcional e resultados compartilháveis

## API de contribuições

`GET /api/contributions/{username}` faz proxy, a partir do servidor, do endpoint `https://github.com/{username}.contribs` do GitHub, evitando as restrições de CORS do navegador. Nomes de usuário válidos recebem o JSON original, incluindo `from`, `to`, `total_contributions`, `colors_full`, `weeks` e `months`. Nomes de usuário inválidos retornam `400`, usuários inexistentes do GitHub retornam `404` e falhas do serviço original retornam `502`. As respostas bem-sucedidas ficam em cache na memória por 10 minutos; `X-Cache` informa `MISS` ou `HIT`.

## Checklist de verificação no navegador

Estas verificações manuais estão pendentes. Use o DevTools do navegador para simular viewport, movimento reduzido, armazenamento e respostas de API quando necessário.

- [ ] Batalhe `octocat` vs `torvalds`; ambos os gráficos, totais, sequências e o vencedor aparecem. Repita usando Enter em qualquer um dos campos de nome de usuário.
- [ ] Envie nomes de usuário em branco e malformados (por exemplo, `bad/name`) em qualquer um dos campos; erros de validação claros aparecem e corrigir as entradas permite uma batalha.
- [ ] Teste um nome de usuário do GitHub com formato válido, mas inexistente, em cada posição de jogador separadamente; o erro da API identifica esse jogador, o carregamento termina e uma nova tentativa com o valor corrigido funciona.
- [ ] Verifique células de gráfico de 12px e cinco amostras de cor na legenda por gráfico. Passe o mouse e foque com o teclado nos dias para ver tooltips visíveis com a data e a contagem de contribuições corretas.
- [ ] Tab entra em cada gráfico em um único dia; as setas movem o foco dentro desse gráfico, e Tab/Shift+Tab saem dele em vez de percorrer todas as células. Os tooltips em foco permanecem visíveis, inclusive perto das bordas do gráfico.
- [ ] Em 1024px, 768px e larguras de celular (por exemplo, 375px), os controles e os resultados continuam utilizáveis. Gráficos largos rolam horizontalmente dentro de seus próprios contêineres, sem rolagem horizontal na página.
- [ ] Alterne os temas e recarregue; o tema selecionado persiste.
- [ ] Execute várias batalhas e recarregue; até 10 batalhas recentes são mantidas. Limpe o histórico e recarregue; ele permanece vazio sem apagar o tema salvo.
- [ ] Compartilhe o resultado de um vencedor e de um empate (use o mesmo nome de usuário para os dois jogadores); o status de vencedor ou empate compartilhado/copiado, os dois nomes e as duas contagens de contribuições correspondem aos resultados exibidos.
- [ ] Verifique a contagem regressiva e a entrada deslizante dos resultados. Ative o movimento reduzido e repita; as animações são suprimidas, mas a batalha ainda chega aos resultados.
- [ ] Simule falhas de leitura/gravação/remoção em `localStorage`, incluindo erros de cota; um aviso permanece visível durante as batalhas, enquanto o compartilhamento e a troca de tema continuam utilizáveis, sem erros não capturados.
- [ ] Simule dados corrompidos de tema/histórico salvos. JSON inválido, histórico que não seja um array ou entradas de histórico inválidas misturadas não devem bloquear as batalhas: o histórico armazenado permanece intacto, os registros válidos são exibidos e novos salvamentos ficam pausados até que o histórico seja limpo com sucesso.
- [ ] Simule JSON inválido ou um formato de resposta inesperado da API de contribuições; o jogador afetado recebe um erro legível enquanto o gráfico de qualquer jogador válido continua visível. Nenhum resultado de vencedor/compartilhamento é oferecido, o carregamento termina e uma nova tentativa válida funciona.

# 🎮 Mona Mayhem

**Workshop de VS Code e GitHub Copilot CLI** — Construa uma Arena de Batalha de Contribuições do GitHub

Um template de workshop para construir, com Astro, um site com tema de arcade retrô que compara os gráficos de contribuição do GitHub de dois usuários. Este é o **ponto de partida**: você vai construir o app passo a passo usando o GitHub Copilot.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*O que você vai construir ao final do workshop*

## 📚 Workshop

O workshop oferece duas trilhas — siga a que corresponde ao seu fluxo de trabalho preferido:

- **Trilha do VS Code** — Chat, Plan Mode, Agent Mode, background agents e ciclos de revisão nativos do editor
- **Trilha da CLI** — `copilot`, contexto com `@file`, `/plan`, edições autônomas, `/fleet`, `/delegate` e `/review`

| Parte | Título | Foco no Copilot |
|-------|--------|-----------------|
| [00](workshop/pt_BR/00-overview.md) | Visão Geral | Escolha da trilha e objetivos de aprendizado |
| [01](workshop/pt_BR/01-setup.md) | Configuração & Engenharia de Contexto | Instruções, permissões e configuração do ambiente |
| [02](workshop/pt_BR/02-plan-and-scaffold.md) | Planejar & Estruturar | Planejamento da API e da arquitetura de páginas |
| [03](workshop/pt_BR/03-agent-mode.md) | Construir o Jogo | Implementação e iteração com agentes |
| [04](workshop/pt_BR/04-design-vibes.md) | Temas Design-First | Planejamento e implementação de design visual |
| [05](workshop/pt_BR/05-polish.md) | Polimento & Trabalho em Paralelo | Paralelismo, revisões e passes de qualidade |
| [06](workshop/pt_BR/06-bonus.md) | Bônus & Extensões | Ideias de recursos abertas e experimentos extras com o Copilot |

## 🚀 Início Rápido

1. **Crie primeiro o seu próprio repositório** de uma destas formas:
   - clicando em **Use this template** para criar um novo repositório, ou
   - fazendo um fork deste repositório.
2. Escolha o seu caminho no workshop:
   - **VS Code:** clone o seu repositório e abra-o no VS Code.
   - **GitHub Copilot CLI:** clone o seu repositório localmente, instale o `copilot` e trabalhe pelo terminal.
3. Siga o [guia do workshop](workshop/pt_BR/00-overview.md)

## Pré-requisitos

### Comuns

- GitHub Copilot (Pro, Business ou Enterprise)
- Git
- Node.js

### Trilha do VS Code

- VS Code v1.107+
- Extensão do GitHub Copilot com login feito

### Trilha da CLI

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ se você pretende instalar a CLI via `npm install -g @github/copilot`
- Ou Homebrew / WinGet, se preferir instalar com um gerenciador de pacotes nativo

## Stack Tecnológica

- **Framework**: [Astro](https://astro.build/) v6
- **Runtime**: Node.js com adaptador [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/)
- **Fonte**: Press Start 2P (fonte de jogos retrô)
- **API**: API de gráfico de contribuições do GitHub

## Notas de Implantação

### Configuração atual do GitHub Pages

O workflow em `.github/workflows/deploy.yml` implanta atualmente o conteúdo estático do workshop e da documentação, de `docs/` e `workshop/`, no GitHub Pages. Ele não faz o build nem a implantação do app Astro em `src/`.

### Se você quiser implantar o app Astro no GitHub Pages

O GitHub Pages é uma hospedagem estática, então o app Astro deve usar saída estática.

1. Altere `output` em `astro.config.mjs` de `server` para `static`.
2. Remova o adaptador Node (`@astrojs/node`) de `astro.config.mjs` e `package.json`.
3. Atualize o workflow do GitHub Actions para executar `npm ci` e `npm run build` e, em seguida, envie `dist/` como artefato do Pages.
4. Se for implantar em uma página de projeto (`https://<user>.github.io/<repo>/`), defina `site` e `base` em `astro.config.mjs`.

Se você pretende manter as rotas de API em execução em produção, use uma plataforma de servidor em vez do GitHub Pages (por exemplo, Vercel, Netlify ou um host Node).

## Licença

MIT
