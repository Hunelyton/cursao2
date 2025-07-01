import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  user: User

  @Column()
  refreshToken: string

  @Column({ type: 'datetime' })
  expiresDate: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

export type IUserToken = UserToken
