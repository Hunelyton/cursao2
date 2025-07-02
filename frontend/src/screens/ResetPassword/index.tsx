import { FormEvent, useContext, useState } from 'react'
import { usersService } from '../../services/usersService'
import { CustomTextField } from '../../components/CustomTextField'
import { Loading } from '../../components/Loading'
import { AlertContext } from '../../../src/contexts/alertContext'
import style from './ResetPassword.module.scss'

export function ResetPassword() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    usersService
      .resetPassword({ email, newPassword: password })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Senha redefinida com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text: err?.response?.data?.message || 'Erro ao redefinir senha',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit} className={style.formContainer}>
      <CustomTextField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <CustomTextField label="Nova senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} type="submit">{loading ? <Loading /> : 'Atualizar senha'}</button>
    </form>
  )
}
