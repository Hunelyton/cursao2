import http from '../api/http'

export const attendancesService = {
  create({ studentId, code, password, date }: any) {
    const body = { studentId, code, password, date }
    return http.post('/attendances', body)
  },

  listByStudent(studentId: string) {
    return http.get('/attendances/' + studentId)
  },
}
