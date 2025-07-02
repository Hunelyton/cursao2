import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ModalLayout } from '../../../../components/ModalLayout'
import { classLessonsService } from '../../../../services/classLessonsService'
import { subjectsService } from '../../../../services/subjectsService'
import style from './ModalClassLessonsList.module.scss'
import { Loading } from '../../../../components/Loading'
import { EmptyItems } from '../../../../components/EmptyItems'

interface Lesson {
  _id: string
  date: string
  description?: string
  subject: string
}

interface Props {
  open: boolean
  handleClose: () => void
}

export function ModalClassLessonsList({ open, handleClose }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editLessonId, setEditLessonId] = useState<string>('')
  const [newDate, setNewDate] = useState<string>('')
  const [newSubject, setNewSubject] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')

  function fetchLessons() {
    setLoading(true)
    classLessonsService
      .getAll()
      .then((res) => setLessons(res.data.items))
      .catch(() => {})
      .finally(() => setLoading(false))
    subjectsService.getAll().then((res) => setSubjects(res.data.items || []))
  }

  useEffect(() => {
    if (open) {
      fetchLessons()
    }
  }, [open])

  function handleEdit(lesson: Lesson) {
    setEditLessonId(lesson._id)
    setNewDate(dayjs(lesson.date).format('YYYY-MM-DDTHH:mm'))
    setNewSubject((lesson as any).subjectId || '')
    setNewDescription(lesson.description || '')
  }

  function handleSave() {
    classLessonsService
      .update({ id: editLessonId, date: newDate, subjectId: newSubject, description: newDescription })
      .then(fetchLessons)
      .finally(() => setEditLessonId(''))
  }

  function handleDelete(id: string) {
    classLessonsService.delete(id).then(fetchLessons)
  }

  return (
    <ModalLayout open={open} handleClose={handleClose} title="Aulas cadastradas">
      {loading && <Loading size={25} color="#cd1414" />}
      {!loading && (
        <table className={style.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Disciplina</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className={style.item}>
                {editLessonId === lesson._id ? (
                  <>
                    <td>
                      <input
                        type="datetime-local"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </td>
                    <td>
                      <select value={newSubject} onChange={(e) => setNewSubject(e.target.value)}>
                        <option value="">Selecione</option>
                        {subjects.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={handleSave} className={style.saveBtn}>Salvar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{dayjs(lesson.date).format('DD/MM/YYYY HH:mm')}</td>
                    <td>{lesson.subject}</td>
                    <td>{lesson.description || '--'}</td>
                    <td>
                      <button type="button" onClick={() => handleEdit(lesson)} className={style.editBtn}>
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(lesson._id)} className={style.deleteBtn}>
                        Deletar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <EmptyItems text="Nenhuma aula cadastrada" customStyle={{ boxShadow: 'none' }} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </ModalLayout>
  )
}
