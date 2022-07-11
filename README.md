# node-express-bootstrap-boilerplate

Node.js/Express.js MVC skeleton project, front end assets built with webpack 5, Bootstrap 4 and jQuery.

## Installation

## Bootstrap version

Checkout to git branch `main` if you intend to use Bootstrap 4 in `app_assets` project.

### app_server

**Prepare dotenv file**

Copy `.env.example` to new `.env` file.

**Serving the application in development environment**

```sh
npm i
npm i -g nodemon
nodemon ./bin/www
```

**Debugging the application**

Windows CMD

```
set DEBUG='*' && nodemon .\bin\www
```

Windows PowerShell

```sh
$env:DEBUG='*'; nodemon .\bin\www
```

macOS / Linux

```sh
DEBUG='*'; nodemon .\bin\www
```

**Serving the application in production environment**

```sh
npm i -g pm2
pm2 start ./bin/www
```

### app_assets

Watching while developing

```
cd app_assets/
npm i
npm run watch
```

Building for development

```
npm run dev
```

Building for staging

```
cd app_assets/
npm i
npm run stage
```

Building for production

```
cd app_assets/
npm i
npm run prod
```

## Dockerization

