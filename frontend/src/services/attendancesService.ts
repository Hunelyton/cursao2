import http from '../api/http'

export const attendancesService = {

  create({ studentId, studentCode, subjectId, code, password }: any) {
    const body = { studentId, studentCode, subjectId, code, password }

    return http.post('/attendances', body)
  },

  listByStudent(studentId: string) {
    return http.get('/attendances/' + studentId)
  },
}
