import { Repository } from 'typeorm'
import { Subject } from '../../entities/subject'
import {
  ISubjectsRepository,
  INewSubjectDTO,
  IUpdate,
} from './ISubjectsRepository'
import { AppDataSource } from '../../shared/infra/mysql/data-source'

export class SubjectsRepository implements ISubjectsRepository {
  private repository: Repository<Subject>
  constructor() {
    this.repository = AppDataSource.getRepository(Subject)
  }

  async list(idTeacher: string): Promise<Subject[]> {
    return await this.repository.find({ where: { teacher: { id: idTeacher } as any } })
  }

  async findById(idSubject: string): Promise<Subject> {
    return await this.repository.findOne({ where: { id: idSubject }, relations: ['students'] })
  }

  async delete(idSubject: string): Promise<void> {
    await this.repository.delete({ id: idSubject })
  }

  async create({ name, code, idTeacher }: INewSubjectDTO): Promise<Subject> {
    const newSubject = this.repository.create({
      name,
      code,
      teacher: idTeacher ? ({ id: idTeacher } as any) : undefined,
    })
    await this.repository.save(newSubject)
    return newSubject
  }

  async update({ fields, idSubject }: IUpdate): Promise<void> {
    await this.repository.update({ id: idSubject }, fields)
  }

  async getEntries({ idTeacher }): Promise<number> {
    return await this.repository.count({ where: { teacher: { id: idTeacher } as any } })
  }

  async insertStudents(
    idSubject: string,
    studentsIds: string[],
  ): Promise<void> {
    const subject = await this.repository.findOne({ where: { id: idSubject }, relations: ['students'] })
    if (!subject) return
    subject.students = [...(subject.students || []), ...studentsIds.map(id => ({ id } as any))]
    await this.repository.save(subject)
  }

  async removeStudents(
    idSubject: string,
    studentsIds: string[],
  ): Promise<void> {
    const subject = await this.repository.findOne({ where: { id: idSubject }, relations: ['students'] })
    if (!subject) return
    subject.students = subject.students?.filter(student => !studentsIds.includes((student as any).id)) || []
    await this.repository.save(subject)
  }

  async removeStudentFromAllSubjects(idStudent: string) {
    const subjects = await this.repository
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.students', 'student')
      .where('student.id = :idStudent', { idStudent })
      .getMany()

    for (const subject of subjects) {
      subject.students = subject.students.filter(s => (s as any).id !== idStudent)
      await this.repository.save(subject)
    }
  }
}
