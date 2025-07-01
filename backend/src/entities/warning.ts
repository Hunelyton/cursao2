import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity('warnings')
export class Warning {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  code: string

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => User, { nullable: true })
  student: User

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
