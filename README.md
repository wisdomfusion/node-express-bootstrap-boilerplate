# node-express-bootstrap-boilerplate

Node.js/Express.js MVC skeleton project, front end assets built with webpack 5, Bootstrap 4 and jQuery.

## 1. Installation

### 1.1 app_server

**Prepare dotenv file**

Copy `.env.example` to new `.env` file.

**Serving the application in development environment**

```sh
npm i
npm i -g nodemon
nodemon ./bin/www
```

**Debugging the application**

```sh
$env:DEBUG='*'; nodemon .\bin\www
```

**Serving the application in production environment**

```sh
npm i -g pm2
pm2 start ./bin/www
```

### 2. app_assets

```
cd app_assets/
npm i
npm run watch
```

## 2. Dockerization

