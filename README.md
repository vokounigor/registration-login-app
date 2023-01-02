# registration-login-app

## A simple client-server application which features registration and login with cookies

### Uses Express/NodeJS/MongoDB on the backend and React/TS on the frontend
<br/>

## How to start it

Both client and server folders contain `Dockerfile` configurations for building their respective instances.

A `docker-compose.yml` file is located in the root of the projects which will build all the containers and setup network config OOTB.

Frontend and backend will share the same domain (to allow cookies):
- frontend will be located on `http://localhost/`
- backend will be located on `http://localhost/api`

> See `nginx/default.conf` if you need further configuration

To start the app, make sure you have docker installed (Docker desktop is recommended) and running, and run the command from the project root:

```bash
docker compose -f "docker-compose.yml" up -d --build 
```
or a shorter version:
```bash
docker-compose up -d
```