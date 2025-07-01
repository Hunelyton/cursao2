import { ISubject } from '../../entities/subject'
import {
  IInsertStudentDTO,
  INewSubjectDTO,
  ISubjectsRepository,
} from './ISubjectsRepository'

export class MockSubjectsRepository implements ISubjectsRepository {
  subjects: ISubject[] = []

  async list(query: any): Promise<ISubject[]> {
    return this.subjects
  }

  async create(newSubjectData: INewSubjectDTO): Promise<ISubject> {
    const newSubject = {
      ...newSubjectData,
      students: null,
      id: Math.random().toString(),
    }

    this.subjects.push(newSubject)

    return newSubject
  }

  async findById(idSubject: string): Promise<ISubject> {
    return this.subjects.find((subject) => (subject as any).id === idSubject)
  }

  async delete(idSubject: string): Promise<void> {
    this.subjects = this.subjects.filter(
      (subject) => (subject as any).id !== idSubject,
    )
  }

  async insertStudent({
    studentsIds,
    subjectId,
  }: IInsertStudentDTO): Promise<void> {
    const indexSubject = this.subjects.findIndex(
      (subject) => (subject as any).id === subjectId,
    )

    if (indexSubject !== -1) {
      this.subjects[indexSubject].students = studentsIds
    }
  }

  async getEntries(): Promise<number> {
    return this.subjects.length
  }
}
