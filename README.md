# cypress.basico-v2

Exemplo da documentação do projeto

# Pré-requisitos

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

- [git](https://git-scm.com/) (estou usando a versão `2.34.1` enquanto escrevo esta aula)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v16.13.2` enquanto escrevo esta aula)
- npm (estou usando a versão `8.3.2` enquanto escrevo esta aula)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (estou usando a versão `111.0.5563.65 (Official Build) (x86_64)` enquanto escrevo esta aula)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.64.0` enquanto escrevo esta aula) ou alguma outra IDE de sua preferência

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version && node --version && npm --version` no seu terminal de linha de comando.
>
> **Obs. 4:** Deixei links para os instaladores na lista de requisitos acima, caso não os tenha instalados ainda.

# Instalação

Rodar `npm install` (or `npm i` para a versão curta) para instalar as dependências de desenvolvimento.

# Testes

Você pode rodar os testes simulando no desktop ou mobile via viewport

### Desktop

Realizar a configuração no package.json, em script e criar o comando `"cy:open": "cypress open"`,
Criar o script para rodar no modo headless`test": "cypress run`

Após executar via terminal o comando `npm run cy:open`
para executar o teste no modo headless `npm run test`, `npm test` (or `npm t` para a versão curta)

### Mobile

Realizar a configuração no package.json, em script e criar o comando `cy:open:mobile":"cypress open --config viewportWidth=410 viewportHeight=860`,
Criar o script para rodar no modo headless `test:mobile":"cypress run --config viewportWidth=410,viewportHeight=860`

Apos executar via terminal o comando `npm run cy:open:mobile`
para executar o teste no modo headless `npm run test:mobile`
