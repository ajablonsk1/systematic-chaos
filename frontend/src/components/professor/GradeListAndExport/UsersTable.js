import { useEffect, useState } from 'react'
import { ExportButton, GradesTable } from './GradeListAndExportStyles'
import { Form } from 'react-bootstrap'
import { debounce } from 'lodash/function'
import ExportModal from './ExportModal'
import GroupService from '../../../services/group.service'
import { ERROR_OCCURED } from '../../../utils/constants'

export default function UsersTable(props) {
  const [usersList, setUsersList] = useState(undefined)

  const [usersToExportIds, setUsersToExportIds] = useState([])
  const [users, setUsers] = useState([]) // used to filtering
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (props.groupId && props.groupName) {
      GroupService.getGroupStudents(props.groupId)
        .then((response) => {
          const responseWithGroupName = response?.map((student) => {
            return { ...student, groupName: props.groupName }
          })
          setUsersList(responseWithGroupName)
          setUsers(responseWithGroupName)
        })
        .catch(() => {
          setUsers(null)
          setUsersList(null)
        })
    } else {
      GroupService.getAllStudents()
        .then((response) => {
          setUsersList(response)
          setUsers([...response])
        })
        .catch(() => {
          setUsers(null)
          setUsersList(null)
        })
    }
  }, [props])

  useEffect(() => {
    setButtonDisabled(usersToExportIds.length === 0)
  }, [usersToExportIds])

  const inputChecked = (userId) => usersToExportIds.includes(userId)
  const headerInputChecked = (event) => event.target && event.target.checked
  const usersId = users?.map((user) => user.id)

  const checkAllRows = (event) => setUsersToExportIds(headerInputChecked(event) ? [...usersId] : [])

  const checkRow = (event) => {
    const userId = +event.target.value
    inputChecked(userId)
      ? setUsersToExportIds((prevState) => prevState.filter((id) => id !== userId))
      : setUsersToExportIds((prevState) => [...prevState, userId])
  }

  const filterList = debounce((query) => {
    if (!query) return setUsers([...usersList])
    setUsers(usersList?.filter((user) => user.name.toLowerCase().includes(query?.toLowerCase())))
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
          {users?.length > 0 ? (
            users.map((user, index) => (
              <tr key={index + user.groupName}>
                <td>
                  <input type={'checkbox'} onChange={checkRow} value={user.id} checked={inputChecked(user.id)} />
                </td>
                <td className={'py-2'}>{user.groupName}</td>
                <td className={'py-2'}>
                  {user.firstName} {user.lastName}
                </td>
                {/*TODO: we don't have this information*/}
                <td className={'py-2'}>3.5</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>{users == null ? ERROR_OCCURED : 'Brak członków'}</p>
              </td>
            </tr>
          )}
        </tbody>
      </GradesTable>

      <ExportButton disabled={isButtonDisabled} onClick={() => setModalVisible(true)}>
        Eksportuj oceny
      </ExportButton>

      <ExportModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} data={usersToExportIds} />
    </>
  )
}
