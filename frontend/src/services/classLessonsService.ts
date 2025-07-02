import http from '../api/http'

export const classLessonsService = {
  create({ subjectId, description, date }: any) {
    const body = { subjectId, description, date }
    return http.post('/classLessons', body)
  },

  getAll() {
    return http.get('/classLessons')
  },

  update({ id, date, description, subjectId }: any) {
    return http.put(`/classLessons/${id}`, { date, description, subjectId })
  },

  delete(id: string) {
    return http.delete(`/classLessons/${id}`)
  },
}
