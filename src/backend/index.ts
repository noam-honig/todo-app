import express from 'express'
import { auth, getUser } from './auth'
import { remultExpress } from 'remult/remult-express'
import { createPostgresDataProvider } from 'remult/postgres'

export const app = express()
app.use(auth)

const api = remultExpress({
  dataProvider: createPostgresDataProvider(),
  getUser,
})
app.use(api)

// serve static files
if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.sendFile(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
}
