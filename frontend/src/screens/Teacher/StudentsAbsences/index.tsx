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
  const [totalLessons, setTotalLessons] = useState<number>(0)
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
    classLessonsService.getAll().then((res) => {
      setTotalLessons(res.data.items.length)
    })
  }, [router.query])

  useEffect(() => {
    if (totalLessons > 0 && students.length > 0) {
      Promise.all(
        students.map((s) =>
          attendancesService
            .listByStudent(s._id)
            .then((res) => ({ id: s._id, count: res.data.items.length }))
            .catch(() => ({ id: s._id, count: 0 })),
        ),
      ).then((items) => {
        const obj: { [key: string]: number } = {}
        items.forEach((it) => {
          obj[it.id] = Math.round((it.count / totalLessons) * 100)
        })
        setAttendancePercentages(obj)
      })
    }
  }, [students, totalLessons])

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
        <button
          type="button"
          className={style.buttonView}
          onClick={() => selectedStudent && setModalListOpened(true)}
          disabled={!selectedStudent}
        >
          Ver presenças
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
