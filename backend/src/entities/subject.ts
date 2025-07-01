import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm'
import { User } from './user'

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  code: string

  @Column()
  name: string

  @ManyToMany(() => User)
  @JoinTable({ name: 'subjects_students' })
  students: User[]

  @ManyToOne(() => User, { nullable: true })
  teacher: User

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

export type ISubject = Subject
