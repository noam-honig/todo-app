# Todo APP

## Deploy to railway
1. init
```sh
railway init
```
2. add database in ui
3. upload code
   ```sh
   railway up
   ```
4. generate custom url on site
```

## Installed components:
1. Basic Setup: `express` and `remult`
   ```sh
   npm i express remult
   npm i --save-dev @types/express ts-node-dev concurrently
   ```
   See [Basic Setup](https://remult.dev/tutorials/react/#option-2-step-by-step-setup)
2. Authentication: `cookie-session`
   ```sh
   npm i cookie-session
   npm i --save-dev @types/cookie-session
   ```
   See [Authentication](https://remult.dev/tutorials/react/auth.html#user-authentication)
3. Postgres:
   ```sh
   npm i pg
   npm i --save-dev @types/pg
   ```
   See [Connect to Postgres](https://remult.dev/tutorials/react/deployment.html#connect-to-postgres)
4. For Heroku Deployment:
   ```sh
   npm i compression helmet heroku-ssl-redirect
   npm i @types/compression --save-dev
   ```
   See [Prepare for Production](https://remult.dev/tutorials/vue/deployment.html#prepare-for-production)
