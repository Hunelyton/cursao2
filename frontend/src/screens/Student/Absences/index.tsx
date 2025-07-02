import { useEffect, useState } from 'react'
import { attendancesService } from '../../../services/attendancesService'
import { usersService } from '../../../services/usersService'
import { TableComponent } from '../../components/TableComponent'

export interface Attendance {
  _id: string
  date: string
  subject: string
}

export function StudentAbsences() {
  const [attendances, setAttendances] = useState<Attendance[]>([])

  useEffect(() => {
    const user = usersService.getUserInfo()
    if (user?._id) {
      attendancesService.listByStudent(user._id).then((res) => {
        setAttendances(res.data.items)
      })
    }
  }, [])

  const columns = [
    { headerName: 'Data', field: 'date' },
    { headerName: 'Matéria', field: 'subject' },
  ]

  return <TableComponent rows={attendances} columns={columns} />
}
