import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useContext, useState } from 'react'
import { attendancesService } from '../../../../services/attendancesService'
import { AlertContext } from '../../../../contexts/alertContext'
import { CustomTextField } from '../../../../components/CustomTextField'
import { Loading } from '../../../../components/Loading'

interface Props {
  studentId: string
  open: boolean
  handleClose: () => void
}

export function ModalAttendance({ open, handleClose, studentId }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    attendancesService

      .create({ studentId, date: new Date(), code, password })

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
      <CustomTextField label="Código" value={code} onChange={(e) => setCode(e.target.value)} />
      <CustomTextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </ModalLayout>
  )
}
