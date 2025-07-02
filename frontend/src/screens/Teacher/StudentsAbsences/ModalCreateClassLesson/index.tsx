import { useEffect, useState, FormEvent, useContext } from 'react'
import { ModalLayout } from '../../../../components/ModalLayout'
import { subjectsService } from '../../../../services/subjectsService'
import { classLessonsService } from '../../../../services/classLessonsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { CustomTextField } from '../../../../components/CustomTextField'

interface Props {
  open: boolean
  handleClose: () => void
}

export function ModalCreateClassLesson({ open, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [subjectId, setSubjectId] = useState('')
  const [subjects, setSubjects] = useState<any[]>([])
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      subjectsService.getAll().then((res) => {
        setSubjects(res.data.items || [])
      })
    }
  }, [open])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    classLessonsService
      .create({ subjectId, description })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Aula criada com sucesso',
        })
        handleClose()
      })
      .catch(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text: 'Erro ao criar aula',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
      title="Nova aula"
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
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </ModalLayout>
  )
}
