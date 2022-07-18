import { GradesTable } from './GradeListAndExportStyles'

export default function UsersTable(props) {
  const users = props.users.participants
  return (
    <GradesTable bordered>
      <thead>
        <th>Grupa</th>
        <th>Imię i nazwisko członka</th>
        <th>Przewidywana ocena</th>
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
    </GradesTable>
  )
}
