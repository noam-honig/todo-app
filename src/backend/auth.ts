import session from 'cookie-session'
import express, { Router } from 'express'
import type { UserInfo } from 'remult'

export const auth = Router()
auth.use('/api', session({ secret: process.env['SESSION_SECRET'] }))

export const validUsers: UserInfo[] = [
  { id: '1', name: 'Jane', roles: ['admin'] },
  { id: '2', name: 'Steve' },
]
auth.post('/api/signIn', express.json({ type: 'text' }), (req, res) => {
  const user = validUsers.find((user) => user.name === req.body.username)
  if (user) {
    req.session!['user'] = user
    res.json(user)
  } else {
    res.status(404).json("Invalid user, try 'Steve' or 'Jane'")
  }
})

auth.post('/api/signOut', (req, res) => {
  req.session!['user'] = null
  res.json('signed out')
})

auth.get('/api/currentUser', (req, res) => {
  res.json(getUser(req))
})
export function getUser(req: express.Request) {
  return req.session?.['user']
}
