import { Repository } from 'typeorm'
import { Grade } from '../../entities/grade'
import {
  ICreateGradeDTO,
  IGradesRepository,
  IUpdate,
} from './IGradesRepository'
import { AppDataSource } from '../../shared/infra/mysql/data-source'

export class GradesRepository implements IGradesRepository {
  private repository: Repository<Grade>
  constructor() {
    this.repository = AppDataSource.getRepository(Grade)
  }


  async create({
    idStudent,
    idSubject,
    firstGrade,
    secondGrade,
  }: ICreateGradeDTO): Promise<Grade> {
    const newGrade = this.repository.create({
      student: idStudent ? ({ id: idStudent } as any) : undefined,
      subject: idSubject ? ({ id: idSubject } as any) : undefined,
      firstGrade,
      secondGrade,
    })
    await this.repository.save(newGrade)
    return newGrade
  }

  async update({ idGrade, fields }: IUpdate): Promise<void> {
    await this.repository.update({ id: idGrade }, fields)
  }

  async listBySubject(idSubject: string): Promise<Grade[]> {
    return await this.repository.find({
      where: { subject: { id: idSubject } as any },
      relations: ['student', 'subject'],
    })
  }

  async listByStudent(idStudent: string): Promise<Grade[]> {
    return await this.repository.find({
      where: { student: { id: idStudent } as any },
      relations: ['student', 'subject'],
    })
  }

  async delete(idGrade: string): Promise<void> {
    await this.repository.delete({ id: idGrade })
  }

  async listBySubjectAndStudent(
    idStudent: string,
    idSubject: string,
  ): Promise<Grade> {
    return await this.repository.findOne({
      where: {
        student: { id: idStudent } as any,
        subject: { id: idSubject } as any,
      },
    })
  }
}
