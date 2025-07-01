import 'reflect-metadata'
import express, { Express, Request, Response } from 'express'
import 'express-async-errors'
import { AppDataSource } from './src/shared/infra/mysql/data-source'
import cors from 'cors'
import { routes } from './src/shared/infra/http/routes'
import './src/shared/containers'
import { DataSource } from 'typeorm'
import { handleError } from './src/shared/infra/http/middlewares/handleError'
import 'dotenv/config'

interface CustomExpress extends Express {
  dataSource?: DataSource
}

const app: CustomExpress = express()

const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(handleError)

AppDataSource.initialize()
  .then((dataSource) => {
    app.dataSource = dataSource
    app.listen(PORT, () =>
      console.log(`Servidor rodando na porta ${PORT}!`)
    )
  })
  .catch(err =>
    console.error('Erro ao conectar com o banco de dados', err),
  )

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send(`<h1>Servidor rodando na porta  ${PORT}</h1>`)
})
