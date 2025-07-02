import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { attendancesService } from '../../../../services/attendancesService'
import { ModalLayout } from '../../../../components/ModalLayout'
import { Loading } from '../../../../components/Loading'
import { EmptyItems } from '../../../../components/EmptyItems'
import style from './ModalAttendancesList.module.scss'

interface Props {
  studentId: string
  open: boolean
  handleClose: () => void
}

export interface Attendance {
  _id: string
  date: string
}

export function ModalAttendancesList({ studentId, open, handleClose }: Props) {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (open) {
      setLoading(true)
      attendancesService
        .listByStudent(studentId)
        .then((res) => {
          setAttendances(res.data.items)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [open, studentId])

  return (
    <ModalLayout open={open} handleClose={handleClose} title="Presenças">
      {loading && <Loading size={25} color="#cd1414" />}
      {!loading && (
        <ul className={style.list}>
          {attendances.map((a) => (
            <li key={a._id}>{dayjs(a.date).format('DD/MM/YYYY')}</li>
          ))}
          {attendances.length === 0 && (
            <EmptyItems
              customStyle={{ boxShadow: 'none' }}
              text="Nenhuma presença registrada"
            />
          )}
        </ul>
      )}
    </ModalLayout>
  )
}
