# Express MVC Boilerplate

Simple MVC boilerplate for building web application using Express, Knex, MariaDB, Nunjucks and Bulma. 

## Whats's Includes

- Simple MVC pattern
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- [knex](https://knexjs.org/) for query builder
- [express-session](https://www.npmjs.com/package/express-session) for session with [connect-session-knex](https://www.npmjs.com/package/connect-session-knex) for the store integration with existing knex instance.
- [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html) for template engine
- [Bulma](https://bulma.io/) as CSS frameworks
- [nodemon](https://github.com/remy/nodemon) for restart server automaticaly (dev environtment)
- [reload](https://github.com/alallier/reload) for auto refresh browser when file changes (dev environtment)
- and many more.


## Install
- Clone this repository and `cd` to target directory 
- Install required depedencies using `npm install`
- Create new .env file for environtment variables. Copy from .env.example `cp .env.example .env` 
- Edit and set site host, port and database configuration on .env file

## Run Dev Server

Run `npm run dev` to start development server. Go to http://localhost:5000. Every file changes will automaticaly refresh your browser.

## IDE Configs
If you use Visual Studio Code, consider to install extentions bellow to make your life easier and happier:

- [vscode-nunjuks](https://github.com/ronnidc/vscode-nunjucks) : Nunjucks template syntax definition specifically for Microsoft Visual Studio Code.
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) : For autoclose html tag. Please add `njk` in `auto-close-tag.activationOnLanguage` config property if not included yet

## Models
For this moment this application is not using any database models/schema. All database interaction handled using Knex query builder. You can access Knex instance via `req.db` object anywhere on application scope.

Example:
```
req.db.select('id','name').from('users');
```

## Routes
Every routes stored in `/routes` directory. Routes uses as middleware in express application.

## Controllers
Every controllers stored in `/controllers` directory. Plain and simple Javascript module.

## Views
Every view file (with `.njk` extension) stored in `/views` directory. You can access global variables for view data via `req.viewData` object. Some ommon view variables such as:
- `baseUrl` : site base url
- `data` :  CRUD data
- `queryParams` : CRUD query parameters such as:
    - `page` : pagination
    - `search` : keyword for search
    - `limmit` and `offset`
- and many more

## License

```
MIT
```

