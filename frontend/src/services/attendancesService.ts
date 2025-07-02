import http from '../api/http'

export const attendancesService = {

  create({ studentId, date, code, password }: any) {
    const body = { studentId, date, code, password }

    return http.post('/attendances', body)
  },

  listByStudent(studentId: string) {
    return http.get('/attendances/' + studentId)
  },
}
