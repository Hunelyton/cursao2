import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './user'
import { Subject } from './subject'

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, { nullable: true })
  student: User

  @ManyToOne(() => Subject, { nullable: true })
  subject: Subject

  @Column({ type: 'float', default: 0 })
  firstGrade: number

  @Column({ type: 'float', default: 0 })
  secondGrade: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
