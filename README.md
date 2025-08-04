CRUD Simples para alteração de dados de usuário.

Feito usando vue.js e Quasar, aplicação WEB que resgata dados de uma API pública e exibe em forma de cartões com possibilidade de criação, edição e alteração, além de um Dashboard demonstrativo e funções básicas de login e sessão.

## Considerações Importantes

- Layouts Separados foram criados para a página de autenticação e para a página de consulta mesmo que o Layout não inclua nenhum elemento, apenas para caso seja necessário escalar o projeto e adicionar múltiplas páginas ou barras de navegação.

- Gráficos de Dashboard apenas para demonstração, como a API utilizada apenas lista nomes de usuários e seus respectivos e-mails, foram criados gráficos fictícios.

- Log-In só inclui campo de e-mail, como a API utilizada só comporta campo de e-mail, o log-in está sendo realizado apenas com e-mail

- Log-In sendo tratado no front-end, apenas para fins de demonstração, devido as limitações da API utilizada, o log-in busca as informações na API e compara com os dados inseridos diretamente no front-end ao invés de enviar um request via /POST , como não há campo de senha, também não existe necessidade de se usar hashes para segurança.

- A sessão está sendo guardada localmente, através do Pinia, esta tecnologia oficialmente (Site oficial do Vue, link abaixo) substitui a ultima versão do Vuex, porém os dois funcionam exatamente da mesma forma.

- Alterações feitas nos dados que vem da API são armazenadas e alteradas localmente apenas, alterações serão perdidas ao atualizar a página.

## Modo de Uso

- Incluir um arquivo .env.local com o link e a chave da API, seguindo o .env.example no projeto foi usado apenas como exemplo, porém a API e a chave são públicas:
  API: `https://reqres.in/api/`
  Chave `reqres-free-v1`

- Rodar localmente através de um `npm run dev` ou `quasar dev`

- Demonstrativo disponibilizado on-line em: [DEMO](https://simple-crud-vue-quasar.vercel.app/#/login)

- Para realizar o login, consultar qualquer e-mail de usuário incluído na API, ou usar o seguinte e-mail de exemplo: `george.bluth@reqres.in`

## Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [Vite](https://vitejs.dev/)
- [Highcharts](https://www.highcharts.com/)
- [Axios](https://axios-http.com/)
- [Pinia](https://pinia.vuejs.org/)
