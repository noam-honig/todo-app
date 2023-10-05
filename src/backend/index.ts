import express from 'express'
import { auth } from './auth'
import { api } from './api'

export const app = express()
app.use(auth)
app.use(api)
