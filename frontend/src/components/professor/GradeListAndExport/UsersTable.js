import { Table } from 'react-bootstrap'

export default function UsersTable(props) {
  const users = props.users.participants
  console.log(props)
  console.log(users)
  return (
    <Table striped bordered hover>
      <thead>
        <th>Grupa</th>
        <th>Imię i nazwisko członka</th>
        <th>Obecnie przewidywana ocena</th>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={index + user.groupName}>
              <td className={'py-2'}>{user.groupName}</td>
              <td className={'py-2'}>{user.name}</td>
              <td className={'py-2'}>{user.grade}</td>
            </tr>
          ))
        ) : (
          <p>Brak członków</p>
        )}
      </tbody>
    </Table>
  )
}
