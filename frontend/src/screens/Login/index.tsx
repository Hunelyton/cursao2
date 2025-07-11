import style from './Login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from '../../../public/assets/logo.png'
import { FormEvent, useContext, useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../src/contexts/alertContext'
import { CustomTextField } from '../../components/CustomTextField'
import { Loading } from '../../components/Loading'
import { tokenService } from '../../services/tokenService'

export interface LoginUserData {
  email: string
  password: string
}

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<LoginUserData>({
    email: '',
    password: '',
  })
  const router = useRouter()

  function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    if (!userData?.email) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'E-mail não informado',
        open: true,
      })
      return
    }

    if (!userData?.password) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'Senha não informada',
        open: true,
      })
      return
    }

    setLoading(true)
    usersService
      .login({ userData })
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          text: 'Usuário autenticado com sucesso',
          open: true,
        })
        usersService.saveUser(res.data.user)
        tokenService.saveToken(res.data.token)
        router.push('/')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR REALIZAR LOGIN,', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar login - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={style.loginContainer}>
      <div className={style.logoContainer}>
        <Image src={logoImage} alt="Logo" className={style.logo} />
      </div>
      <h2>Entrar com uma conta existente</h2>

      <form onSubmit={onLogin} className={style.formContainer}>
        <CustomTextField
          size="medium"
          value={userData?.email}
          className={style.input}
          type="text"
          label="E-mail"
          placeholder="Digite seu E-mail"
          onChange={(event) => {
            setUserData({
              ...userData,
              email: event.target.value,
            })
          }}
        />
        <CustomTextField
          label="Senha"
          size="medium"
          className={style.input}
          value={userData?.password}
          type="password"
          placeholder="Senha"
          onChange={(event) => {
            setUserData({
              ...userData,
              password: event.target.value,
            })
          }}
        />
        <button disabled={loading} type="submit">
          {loading ? <Loading /> : 'Entrar'}
        </button>
      </form>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
      <Link href="/resetPassword" className={style.createAccountLink}>
        Fazer nova senha
      </Link>
    </div>
  )
}
