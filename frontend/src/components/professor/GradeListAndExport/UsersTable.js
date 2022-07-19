import { useEffect, useState } from 'react'
import { ExportButton, GradesTable } from './GradeListAndExportStyles'
import { Form } from 'react-bootstrap'
import { debounce } from 'lodash/function'
import ExportModal from './ExportModal'

export default function UsersTable(props) {
  const usersList = props.users.participants
  const [usersToExportIds, setUsersToExportIds] = useState([])
  const [users, setUsers] = useState(usersList)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setButtonDisabled(usersToExportIds.length === 0)
  }, [usersToExportIds])

  const inputChecked = (userId) => usersToExportIds.includes(userId)
  const headerInputChecked = (event) => event.target && event.target.checked
  const usersId = users.map((user) => user.id)

  const checkAllRows = (event) => setUsersToExportIds(headerInputChecked(event) ? [...usersId] : [])

  const checkRow = (event) => {
    const userId = +event.target.value
    inputChecked(userId)
      ? setUsersToExportIds((prevState) => prevState.filter((id) => id !== userId))
      : setUsersToExportIds((prevState) => [...prevState, userId])
  }

  const filterList = debounce((query) => {
    if (!query) return setUsers([...usersList])
    setUsers(usersList.filter((user) => user.name.toLowerCase().includes(query?.toLowerCase())))
  }, 300)

  return (
    <>
      <Form.Group className={'my-3'}>
        <Form.Control type={'text'} placeholder={'Wyszukaj studenta...'} onChange={(e) => filterList(e.target.value)} />
      </Form.Group>

      <GradesTable bordered>
        <thead>
          <tr>
            <th>
              <input type={'checkbox'} onChange={checkAllRows} />
            </th>
            <th>Grupa</th>
            <th>Imię i nazwisko członka</th>
            <th>Przewidywana ocena</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index + user.groupName}>
                <td>
                  <input type={'checkbox'} onChange={checkRow} value={user.id} checked={inputChecked(user.id)} />
                </td>
                <td className={'py-2'}>{user.groupName}</td>
                <td className={'py-2'}>{user.name}</td>
                <td className={'py-2'}>{user.grade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>Brak członków</p>
              </td>
            </tr>
          )}
        </tbody>
      </GradesTable>

      <ExportButton disabled={isButtonDisabled} onClick={() => setModalVisible(true)}>
        Eksportuj oceny
      </ExportButton>

      <ExportModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </>
  )
}
