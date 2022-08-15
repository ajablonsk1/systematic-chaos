import React, { useEffect, useState } from 'react'
import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'
import { TableContainer } from './ParticipantsStyles'
import ChangeGroupModal from './ChangeGroupModal'
import { Button } from 'react-bootstrap'
import GroupService from '../../../services/group.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import BonusPointsModal from './BonusPointsModal'

function ParticipantsTable(props) {
  const [changeGroupModalOpen, setChangeGroupModalOpen] = useState(false)
  const [bonusPointsModalOpen, setBonusPointsModalOpen] = useState(false)
  const [chosenStudent, setChosenStudent] = useState()
  const [studentsList, setStudentsList] = useState([])

  // "if (!modalOpen)" is here because this useEffect is triggered
  // when we have finished group change process and closed this modal
  useEffect(() => {
    if (!changeGroupModalOpen) {
      if (!props.groupId || !props.groupName) {
        GroupService.getAllStudents()
          .then((response) => setStudentsList([...response]))
          .catch(() => {
            setStudentsList(null)
          })
      } else {
        GroupService.getGroupStudents(props.groupId)
          .then((response) => {
            const responseWithGroupName = response?.map((student) => {
              return { ...student, groupName: props.groupName }
            })
            setStudentsList(responseWithGroupName)
          })
          .catch(() => {
            setStudentsList(null)
          })
      }
    }
  }, [props, changeGroupModalOpen])

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
          {studentsList?.length > 0 ? (
            studentsList.map((student, index) => (
              <tr key={index + student.groupName}>
                <td className={'py-2'}>{student.groupName}</td>
                <td className={'py-2'}>
                  {student.firstName} {student.lastName}
                </td>
                <td className={'py-2 text-center d-flex justify-content-center align-items-center'}>
                  <Button
                    style={{ backgroundColor: 'var(--button-green)', border: 'none' }}
                    onClick={() => {
                      setChosenStudent(student)
                      setChangeGroupModalOpen(true)
                    }}
                  >
                    Zmień grupę
                  </Button>
                  <Button
                    className={'ml-2'}
                    style={{ backgroundColor: 'var(--button-green)', border: 'none' }}
                    onClick={() => {
                      setChosenStudent(student)
                      setBonusPointsModalOpen(true)
                    }}
                  >
                    Przyznaj punkty
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>{studentsList == null ? ERROR_OCCURRED : 'Brak członków'}</p>
              </td>
            </tr>
          )}
        </tbody>
      </TableContainer>
      <ChangeGroupModal show={changeGroupModalOpen} setModalOpen={setChangeGroupModalOpen} student={chosenStudent} />
      <BonusPointsModal
        show={bonusPointsModalOpen}
        setModalOpen={setBonusPointsModalOpen}
        studentId={chosenStudent?.id}
      />
    </GameCardOptionPick>
  )
}

export default ParticipantsTable
