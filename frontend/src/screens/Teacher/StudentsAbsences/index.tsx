import { studentsService } from '../../../services/studentsService'
import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { ModalAttendance } from './ModalAttendance'
import { Loading } from '../../../components/Loading'

export interface Student {
  _id: string
  name: string
}

export function StudentsAbsences() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined,
  )
  const [modalAttendanceOpened, setModalAttendanceOpened] = useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
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
  }, [router.query])

  function handleOpenAttendance(student: Student) {
    setModalAttendanceOpened(true)
    setSelectedStudent(student)
  }

  const columns = useColumns({
    handleOpenAttendance,
  })

  return (
    <>
      {students?.length > 0 && (
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
        />
      )}

      {students?.length === 0 && loadingStudents && (
        <Loading size={30} color="#cd1414" />
      )}

      {students?.length === 0 && !loadingStudents && (
        <EmptyItems text="Nenhum aluno foi encontrado" />
      )}

      {modalAttendanceOpened && selectedStudent && (
        <ModalAttendance
          studentId={selectedStudent._id}
          open={modalAttendanceOpened}
          handleClose={() => {
            setModalAttendanceOpened(false)
            setSelectedStudent(undefined)
          }}
        />
      )}
    </>
  )
}
