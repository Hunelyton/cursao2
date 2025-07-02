import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useContext, useState, useEffect } from 'react'
import { attendancesService } from '../../../../services/attendancesService'
import { AlertContext } from '../../../../contexts/alertContext'
import { CustomTextField } from '../../../../components/CustomTextField'
import { Loading } from '../../../../components/Loading'
import { subjectsService } from '../../../../services/subjectsService'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => void
}

export function ModalAttendance({ open, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [subjectId, setSubjectId] = useState('')
  const [subjects, setSubjects] = useState<any[]>([])
  const [date, setDate] = useState('')

  useEffect(() => {
    if (open) {
      subjectsService.getAll().then((res) => {
        const items = res.data.items || []
        setSubjects(items)
      })
    }
  }, [open])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    attendancesService


      .create({ studentCode: code, subjectId, date, code, password })


      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Presença registrada',
        })
        handleClose()

      })
      .catch(() => {

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',

          text: 'Erro ao registrar presença',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
      title="Marcar presença"
      submitButtonText="Confirmar"
      loading={loading}
    >
      <FormControl fullWidth sx={{ marginBottom: '10px' }}>
        <InputLabel id="subject-select-label">Disciplina</InputLabel>
        <Select
          labelId="subject-select-label"
          value={subjectId}
          label="Disciplina"
          onChange={(e) => setSubjectId(e.target.value as string)}
          required
        >
          {subjects.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomTextField
        type="datetime-local"
        label="Data"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <CustomTextField label="Código" value={code} onChange={(e) => setCode(e.target.value)} />
      <CustomTextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </ModalLayout>
  )
}
