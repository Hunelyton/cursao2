import { Column, CellFunctionParams } from '../../../../src/models/columns'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { Subject } from '..'

interface UseColumnsParams {
  handleDeleteSubject: (subject: Subject) => void
}

export function useColumns({
  handleDeleteSubject,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: handleDeleteSubject,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nome da disciplina',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Quantidade de alunos',
      field: 'students',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.length || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
