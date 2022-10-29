import { useCallback, useEffect, useState } from 'react'
import { ExportButton, GradesTable } from './GradeListAndExportStyles'
import { Form } from 'react-bootstrap'
import { debounce } from 'lodash/function'
import ExportModal from './ExportModal'
import GroupService from '../../../services/group.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { GameCardOptionPick } from '../../general/GameCardStyles'
import { connect } from 'react-redux'
import ProfessorService from '../../../services/professor.service'

function UsersTable(props) {
  const [usersList, setUsersList] = useState(undefined)

  const [usersToExportIds, setUsersToExportIds] = useState([])
  const [users, setUsers] = useState([]) // used to filtering
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)
  const [gradesList, setGradesList] = useState(null)

  const getStudentGrade = useCallback(
    (studentId) => {
      if (!gradesList) {
        return '-'
      }

      const studentGrade = gradesList.find((studentGrade) => studentGrade.student.id === studentId)?.grade
      return studentGrade ? studentGrade.toFixed(1) : '-'
    },
    [gradesList]
  )

  useEffect(() => {
    ProfessorService.getStudentGrades().then((response) => {
      setGradesList(response)
    })
  }, [])

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
    setUsers(
      usersList?.filter((user) =>
        (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(query?.toLowerCase())
      )
    )
  }, 300)

  return (
    <>
      <Form.Group className={'my-3'}>
        <Form.Control type={'text'} placeholder={'Wyszukaj studenta...'} onChange={(e) => filterList(e.target.value)} />
      </Form.Group>

      <GameCardOptionPick style={{ maxHeight: '75vh', overflowY: 'auto' }}>
        <GradesTable
          $background={props.theme.primary}
          $tdColor={props.theme.secondary}
          $fontColor={props.theme.font}
          bordered
        >
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
                  <td className={'py-2'}>{getStudentGrade(user.id)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='100%' className={'text-center'}>
                  <p>{users == null ? ERROR_OCCURRED : 'Brak członków'}</p>
                </td>
              </tr>
            )}
          </tbody>
        </GradesTable>
      </GameCardOptionPick>

      <ExportButton
        $buttonColor={props.theme.success}
        disabled={isButtonDisabled}
        onClick={() => setModalVisible(true)}
      >
        Eksportuj oceny
      </ExportButton>

      <ExportModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} data={usersToExportIds} />
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(UsersTable)
