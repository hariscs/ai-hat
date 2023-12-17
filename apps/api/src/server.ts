import path from 'node:path'
import { json, urlencoded } from 'body-parser'
import type { Express } from 'express'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import uploadRoute from './routes/uploadRoute'

export const createServer = (): Express => {
  const app = express()

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use('/videos', express.static(path.join(__dirname, 'videos')))
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` })
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true })
    })
    .use('/upload', uploadRoute)

  return app
}
