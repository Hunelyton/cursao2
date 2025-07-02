import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ModalLayout } from '../../../../components/ModalLayout'
import { classLessonsService } from '../../../../services/classLessonsService'
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
  const [loading, setLoading] = useState<boolean>(true)
  const [editLessonId, setEditLessonId] = useState<string>('')
  const [newDate, setNewDate] = useState<string>('')

  function fetchLessons() {
    setLoading(true)
    classLessonsService
      .getAll()
      .then((res) => setLessons(res.data.items))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (open) {
      fetchLessons()
    }
  }, [open])

  function handleEdit(lesson: Lesson) {
    setEditLessonId(lesson._id)
    setNewDate(dayjs(lesson.date).format('YYYY-MM-DDTHH:mm'))
  }

  function handleSave() {
    classLessonsService
      .update({ id: editLessonId, date: newDate })
      .then(fetchLessons)
      .finally(() => setEditLessonId(''))
  }

  return (
    <ModalLayout open={open} handleClose={handleClose} title="Aulas cadastradas">
      {loading && <Loading size={25} color="#cd1414" />}
      {!loading && (
        <ul className={style.list}>
          {lessons.map((lesson) => (
            <li key={lesson._id} className={style.item}>
              {editLessonId === lesson._id ? (
                <div className={style.editRow}>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <button type="button" onClick={handleSave} className={style.saveBtn}>
                    Salvar
                  </button>
                </div>
              ) : (
                <>
                  <span>{dayjs(lesson.date).format('DD/MM/YYYY HH:mm')}</span>
                  <span>{lesson.subject}</span>
                  <button type="button" onClick={() => handleEdit(lesson)} className={style.editBtn}>
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
          {lessons.length === 0 && <EmptyItems text="Nenhuma aula cadastrada" customStyle={{ boxShadow: 'none' }}/>} 
        </ul>
      )}
    </ModalLayout>
  )
}
