# Be The Hero - API

[![Be The Hero][logo]](https://web-bethehero-omnistack11.herokuapp.com) é uma plataforma online feita para ajudar ONGs a encontrarem heróis que as ajudem nos seus casos.

## :fire: Tecs

- [ExpressJS] - Framework web minimalista para [NodeJS].
- [Bcrypt] - Ajuda a lidar com hash de senhas.
- [Celebrate] - Middleware [ExpressJS] que envolve a lib de validação JOI.
- [CORS] - Middleware [ExpressJS] para ativar o cors com varias opções.
- [JWT] - Implementação em [NodeJS] do padrão Json Web Token.
- [KNexJS] - Query builder para [NodeJS].
- [SQLite3] - Modulo SQLite3 para [NodeJS].
- [NodeJS] - Ferramenta de magia negra.

### :wrench: Configure

```shell
  $ git clone https://github.com/paulloclara/be-the-hero-api # Clone o repositório.
  $ cd be-the-hero-api # Navegue ate a pasta.
  $ yarn -i # Instale as dependencias.
  # Configure o arquivo .env de acordo com o .env_example.
  $ yarn migration # Execute as migrations.
  $ yarn dev # Inicie o servidor em modo de desenvolvimento.
```

### :scroll: Scripts

- start - Inicia o servidor em modo produção.
- dev - Inicia o servidor em modo desenvolvimento.
- migration - Executa as migrations.
- applyDevDatafake - Limpa o banco de dados, roda o script para gerar dados falsos e executa o servidor em modo desenvolvimento.

#### :link: Créditos

O projeto teve como base a [SemanaOmniStack11] da [Rocketseat] feito em
[ReactJS], os vídeos são apagados ao fim de cada semana, porém… a internet é a
internet, o canal [CursosReactOmniStack] no Telegram disponibiliza todos os
vídeos a partir da semana 7.

#### :memo: Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE] para obter detalhes.

<!-- Imagens -->

[logo]: .github/logo.svg "Be The Hero Logo"

<!-- Links -->

[paulloclara]: https://github.com/paulloclara
[expressjs]: https://expressjs.com
[bcrypt]: https://www.npmjs.com/package/bcrypt
[celebrate]: https://www.npmjs.com/package/celebrate
[cors]: https://www.npmjs.com/package/cors
[jwt]: https://www.npmjs.com/package/jsonwebtoken
[knexjs]: https://www.npmjs.com/package/knex
[sqlite3]: https://www.npmjs.com/package/sqlite3
[nodejs]: https://nodejs.org/en
[reactjs]: https://pt-br.reactjs.org
[rocketseat]: https://rocketseat.com.br
[semanaomnistack11]: https://github.com/DanielObara/SemanaOmnistack11
[cursosreactomnistack]: https://t.me/reactomnistack
[license]: LICENSE

---

Projeto de cunho didático feito por [PaulloClara] :octocat:
