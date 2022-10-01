import React from 'react'
import { Spinner } from 'react-bootstrap'
import { TableContainer } from '../../../student/PointsPage/Tables/TableStyle'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import { useGetGroupInvitationCodeListQuery } from '../../../../api/hooks/groupController.hooks'

export default function GroupsTable(props) {
  const groupsData = useGetGroupInvitationCodeListQuery({ reload: props.isGroupAdded })

  const TableBody = (tableContent) => {
    return tableContent.map((row, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{row.name}</td>
        <td>{row.invitationCode}</td>
      </tr>
    ))
  }

  return (
    <>
      <TableContainer>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Nazwa grupy</th>
            <th>Kod</th>
          </tr>
        </thead>
        <tbody>
          {groupsData.isFetching ? (
            <tr>
              <td colSpan={3}>
                <Spinner animation={'border'} />
              </td>
            </tr>
          ) : groupsData.isError ? (
            <tr>
              <td colSpan={3}>{ERROR_OCCURRED}</td>
            </tr>
          ) : (
            groupsData.isSuccess && TableBody(groupsData.data)
          )}
        </tbody>
      </TableContainer>
    </>
  )
}
