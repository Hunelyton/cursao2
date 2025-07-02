import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import style from '../StudentsAbsences.module.scss'

interface UseColumnsParams {
  handleOpenAttendance: (student: Student) => void
}

export function useColumns({ handleOpenAttendance }: UseColumnsParams) {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {
      headerName: 'Nome do aluno',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {


      headerName: 'Quantidade de avisos',
      field: 'warningsAmount',
      valueFormatter: (params: CellFunctionParams<any>) => params?.value || 0,
    },
    {

      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams<any>) => {
        return (
          <>
            <button
              type="button"
              onClick={() => handleOpenAttendance(params.data)}
              className={style.actionButton}
            >
              Marcar presença
            </button>
          </>
        )
      },
    },
  ]
}
