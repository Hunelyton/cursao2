import http from '../api/http'

export const classLessonsService = {
  create({ subjectId, date, teacherPassword }: any) {
    const body = { subjectId, date, teacherPassword }
    return http.post('/classLessons', body)
  },
}
