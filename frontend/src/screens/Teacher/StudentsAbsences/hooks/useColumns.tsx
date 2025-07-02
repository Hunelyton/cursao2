import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import style from '../StudentsAbsences.module.scss'

interface Params {
  attendancePercentages: { [key: string]: number }
  onViewAttendances: (student: any) => void
}

export function useColumns({ attendancePercentages, onViewAttendances }: Params) {
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
      headerName: 'Presenças',
      field: 'percentage',
      valueFormatter: (params: CellFunctionParams<any>) =>
        `${attendancePercentages[params.data._id] || 0}%`,
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<any>) => (
        <button
          type="button"
          className={style.buttonView}
          onClick={() => onViewAttendances(params.data)}
        >
          Ver presenças
        </button>
      ),
    },
  ]
}
