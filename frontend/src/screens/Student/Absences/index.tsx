import { useEffect, useState } from 'react'
import { attendancesService } from '../../../services/attendancesService'
import { classLessonsService } from '../../../services/classLessonsService'
import { usersService } from '../../../services/usersService'
import { TableComponent } from '../../../components/TableComponent'
import dayjs from 'dayjs'
import style from './Absences.module.scss'

interface Row {
  _id: string
  date: string
  subject: string
  description?: string
  status: string
}

export function StudentAbsences() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    const user = usersService.getUserInfo()
    if (user?._id) {
      Promise.all([
        classLessonsService.getAll(),
        attendancesService.listByStudent(user._id),
      ]).then(([lessRes, attRes]) => {
        const lessons = lessRes.data.items || []
        const attendances = attRes.data.items || []
        const formatted = lessons.map((l: any) => {
          const present = attendances.some((a: any) =>
            dayjs(a.date).isSame(l.date, 'day'),
          )
          return {
            _id: l._id,
            date: dayjs(l.date).format('DD/MM/YYYY'),
            subject: l.subject,
            description: l.description,
            status: present ? 'Presente' : 'Ausente',
          }
        })
        setRows(formatted)
      })
    }
  }, [])

  const columns = [
    { headerName: 'Data', field: 'date' },
    { headerName: 'Disciplina', field: 'subject' },
    { headerName: 'Descrição', field: 'description' },
    {
      headerName: 'Status',
      field: 'status',
      cellClass: ({ value }: any) =>
        value === 'Presente' ? style.present : style.absent,
    },
  ]

  return <TableComponent rows={rows} columns={columns} loading={false} />
}
