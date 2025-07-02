import http from '../api/http'

export const attendancesService = {

  create({ studentId, subjectId, date }: any) {
    const body = { studentId, subjectId, date }

    return http.post('/attendances', body)
  },

  listByStudent(studentId: string) {
    return http.get('/attendances/' + studentId)
  },
}
