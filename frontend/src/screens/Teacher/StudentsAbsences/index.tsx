import { studentsService } from '../../../services/studentsService'
import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { ModalAttendance } from './ModalAttendance'
import { ModalAttendancesList } from './ModalAttendancesList'
import { ModalCreateClassLesson } from './ModalCreateClassLesson'
import { ModalClassLessonsList } from './ModalClassLessonsList'
import { classLessonsService } from '../../../services/classLessonsService'
import { attendancesService } from '../../../services/attendancesService'
import { subjectsService } from '../../../services/subjectsService'
import style from './StudentsAbsences.module.scss'
import { Loading } from '../../../components/Loading'

export interface Student {
  _id: string
  name: string
  code?: string
}

export function StudentsAbsences() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined,
  )
  const [modalAttendanceOpened, setModalAttendanceOpened] = useState<boolean>(false)
  const [modalClassLessonOpened, setModalClassLessonOpened] = useState<boolean>(false)
  const [modalListOpened, setModalListOpened] = useState<boolean>(false)
  const [modalLessonsOpened, setModalLessonsOpened] = useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
  const [attendancePercentages, setAttendancePercentages] = useState<{ [key: string]: number }>({})
  const [lessons, setLessons] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const router = useRouter()

  function getStudents() {
    setLoadingStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        setStudents(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ALUNOS, ', err)
      })
      .finally(() => {
        setLoadingStudents(false)
      })
  }

  useEffect(() => {
    getStudents()
    classLessonsService.getAll().then((res) => setLessons(res.data.items))
    subjectsService.getAll().then((res) => setSubjects(res.data.items))
  }, [router.query])

  useEffect(() => {
    if (students.length > 0 && lessons.length > 0 && subjects.length > 0) {
      Promise.all(
        students.map((s) => {
          const studentSubjects = subjects
            .filter((sub: any) => sub.students?.includes(s._id))
            .map((sub: any) => sub._id)
          const lessonsForStudent = lessons.filter((l) =>
            studentSubjects.includes(l.subjectId),
          )
          const total = lessonsForStudent.length
          return attendancesService
            .listByStudent(s._id)
            .then((res) => {
              const count = (res.data.items || []).filter((a: any) =>
                studentSubjects.includes(a.subjectId),
              ).length
              return { id: s._id, percentage: total ? Math.round((count / total) * 100) : 0 }
            })
            .catch(() => ({ id: s._id, percentage: 0 }))
        }),
      ).then((items) => {
        const obj: { [key: string]: number } = {}
        items.forEach((it) => {
          obj[it.id] = it.percentage
        })
        setAttendancePercentages(obj)
      })
    }
  }, [students, lessons, subjects])

  function handleRowClick(student: Student) {
    setSelectedStudent(student)
  }

  function handleViewAttendances(student: Student) {
    setSelectedStudent(student)
    setModalListOpened(true)
  }

  const columns = useColumns({
    attendancePercentages,
    onViewAttendances: handleViewAttendances,
  })

  return (
    <>
      <div className={style.actionsTop}>
        <button
          type="button"
          className={`${style.buttonAttendance} ${style.buttonMarkAttendance}`}
          onClick={() => setModalAttendanceOpened(true)}
        >
          Marcar presença
        </button>
        <button
          type="button"
          className={style.buttonAttendance}
          onClick={() => setModalClassLessonOpened(true)}
        >
          Nova aula
        </button>
        <button
          type="button"
          className={style.buttonAttendance}
          onClick={() => setModalLessonsOpened(true)}
        >
          Ver aulas
        </button>
      </div>

      {students?.length > 0 && (
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
          onRowClick={handleRowClick}
        />
      )}

      {students?.length === 0 && loadingStudents && (
        <Loading size={30} color="#cd1414" />
      )}

      {students?.length === 0 && !loadingStudents && (
        <EmptyItems text="Nenhum aluno foi encontrado" />
      )}

      {modalAttendanceOpened && (
        <ModalAttendance
          open={modalAttendanceOpened}
          handleClose={() => setModalAttendanceOpened(false)}
        />
      )}

      {modalClassLessonOpened && (
        <ModalCreateClassLesson
          open={modalClassLessonOpened}
          handleClose={() => setModalClassLessonOpened(false)}
        />
      )}

      {modalLessonsOpened && (
        <ModalClassLessonsList
          open={modalLessonsOpened}
          handleClose={() => setModalLessonsOpened(false)}
        />
      )}

      {modalListOpened && selectedStudent && (
        <ModalAttendancesList
          studentId={selectedStudent._id}
          open={modalListOpened}
          handleClose={() => setModalListOpened(false)}
        />
      )}
    </>
  )
}
