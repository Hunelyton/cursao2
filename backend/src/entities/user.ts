import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  code: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  occupation: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  avatarURL: string

  @ManyToOne(() => User, user => user.students, { nullable: true })
  teacher: User

  @OneToMany(() => User, user => user.teacher)
  students: User[]

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'int', default: 0 })
  warningsAmount: number
}
