import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../../entities/user'
import { Subject } from '../../../entities/subject'
import { Grade } from '../../../entities/grade'
import { Warning } from '../../../entities/warning'
import { UserToken } from '../../../entities/userToken'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Subject, Grade, Warning, UserToken],
  synchronize: true,
})
