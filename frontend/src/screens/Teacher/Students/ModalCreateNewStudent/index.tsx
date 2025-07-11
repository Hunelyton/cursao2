import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewStudent.module.scss'
import { CustomTextField } from '../../../../components/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { studentsService } from '../../../../services/studentsService'

const monthsLabels: { [key: string]: string } = {
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  october: 'Outubro',
  november: 'Novembro',
  december: 'Dezembro',
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
}

export interface NewStudentData {
  name: string
  email: string
  password?: string
  isActive?: boolean
  monthlyPayments?: { [key: string]: boolean }
}

interface Props {
  getStudents: () => void
  studentDataToEdit: NewStudentData | undefined
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewStudent({
  open,
  handleClose,
  studentDataToEdit,
  getStudents,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewStudentValues = {
    name: '',
    email: '',
    password: '',
    isActive: true,
    monthlyPayments: {
      july: false,
      august: false,
      september: false,
      october: false,
      november: false,
      december: false,
      january: false,
      february: false,
      march: false,
      april: false,
      may: false,
      june: false,
    },
  }
  const [newStudentData, setNewStudentData] = useState<NewStudentData>(
    studentDataToEdit || defaultNewStudentValues,
  )
  const [loadingCreateNewStudent, setLoadingCreateNewStudent] =
    useState<boolean>(false)

  function onCreateNewStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCreateNewStudent(true)
    studentsService
      .create({ newStudentData })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Aluno cadastrado com sucesso',
        })
        getStudents()
        setNewStudentData(defaultNewStudentValues)
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar aluno ' +
            `(${err?.response?.data?.message || err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewStudent(false)
      })
  }

  function onEditStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCreateNewStudent(true)
    studentsService
      .updateStudent({ studentData: newStudentData })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados do aluno atualizados com sucesso',
        })
        setNewStudentData(defaultNewStudentValues)
        handleClose()
        getStudents()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text: `Erro ao tentar atualizar dados do aluno - (${
            err?.response?.data?.message || err?.message
          })`,
        })
      })
      .finally(() => {
        setLoadingCreateNewStudent(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={studentDataToEdit ? onEditStudent : onCreateNewStudent}
      title={studentDataToEdit ? 'Editar aluno ' : 'Cadastro de aluno'}
      submitButtonText={studentDataToEdit ? 'Atualizar' : 'Cadastrar'}
      loading={loadingCreateNewStudent}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          value={newStudentData?.name}
          onChange={(event) => {
            setNewStudentData({
              ...newStudentData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          required
          label="E-mail"
          type="email"
          placeholder="Digite o email"
          value={newStudentData?.email}
          onChange={(event) => {
            setNewStudentData({
              ...newStudentData,
              email: event.target.value,
            })
          }}
        />
        {!studentDataToEdit && (
          <CustomTextField
            size="small"
            required
            label="Senha"
            type="password"
            placeholder="Digite a senha"
            value={newStudentData?.password}
            onChange={(event) => {
              setNewStudentData({
                ...newStudentData,
                password: event.target.value,
              })
            }}
          />
        )}

        <div className={style.monthsContainer}>
          {Object.keys(newStudentData.monthlyPayments || {}).map((month) => (
            <label key={month} className={style.monthItem}>
              <input
                type="checkbox"
                checked={newStudentData.monthlyPayments?.[month]}
                onChange={(e) => {
                  setNewStudentData({
                    ...newStudentData,
                    monthlyPayments: {
                      ...newStudentData.monthlyPayments,
                      [month]: e.target.checked,
                    },
                  })
                }}
              />
              {monthsLabels[month]}
            </label>
          ))}
        </div>

        <label className={style.statusLabel}>
          <input
            type="checkbox"
            checked={newStudentData.isActive}
            onChange={(e) =>
              setNewStudentData({
                ...newStudentData,
                isActive: e.target.checked,
              })
            }
          />
          Ativo
        </label>
      </div>
    </ModalLayout>
  )
}
