import React, { useEffect, useState } from 'react'
import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'
import { TableContainer } from './ParticipantsStyles'
import ChangeGroupModal from './ChangeGroupModal'
import { Button } from 'react-bootstrap'
import GroupService from '../../../services/group.service'

function ParticipantsTable(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [chosenStudent, setChosenStudent] = useState()
  const [studentsList, setStudentsList] = useState([])

  // "if (!modalOpen)" is here because this useEffect is triggered
  // when we have finished group change process and closed this modal
  useEffect(() => {
    if (!modalOpen) {
      if (!props.groupId || !props.groupName) {
        GroupService.getAllStudents().then((response) => setStudentsList(response))
      } else {
        GroupService.getGroupStudents(props.groupId).then((response) => {
          const responseWithGroupName = response?.map((student) => {
            return { ...student, groupName: props.groupName }
          })
          setStudentsList(responseWithGroupName)
        })
      }
    }
  }, [props, modalOpen])

  return (
    <GameCardOptionPick>
      <TableContainer>
        <thead>
          <tr>
            <th>Nazwa grupy</th>
            <th>Imię i nazwisko członka</th>
            <th className={'text-center'}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {studentsList.length > 0 ? (
            studentsList.map((student, index) => (
              <tr key={index + student.groupName}>
                <td className={'py-2'}>{student.groupName}</td>
                <td className={'py-2'}>
                  {student.firstName} {student.lastName}
                </td>
                <td className={'py-2 text-center'}>
                  <Button
                    style={{ backgroundColor: 'var(--button-green)', border: 'none' }}
                    onClick={() => {
                      setChosenStudent(student)
                      setModalOpen(true)
                    }}
                  >
                    Zmień grupę
                  </Button>
                </td>
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
      </TableContainer>
      <ChangeGroupModal show={modalOpen} setModalOpen={setModalOpen} student={chosenStudent} />
    </GameCardOptionPick>
  )
}

export default ParticipantsTable
