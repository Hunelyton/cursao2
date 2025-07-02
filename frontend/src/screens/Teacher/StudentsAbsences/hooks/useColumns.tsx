import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

export function useColumns() {
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
  ]
}
