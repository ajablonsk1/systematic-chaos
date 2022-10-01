import React, { useEffect, useState } from 'react'
import { GameCardOptionPick } from '../../general/GameCardStyles'
import { TableContainer } from './ParticipantsStyles'
import ChangeGroupModal from './ChangeGroupModal'
import { Button } from 'react-bootstrap'
import { ERROR_OCCURRED } from '../../../utils/constants'
import BonusPointsModal from './BonusPointsModal'
import { useGetStudentsWithGroupAllQuery } from '../../../api/hooks/userController.hooks'
import { useGetGroupStudentsQuery } from '../../../api/hooks/groupController.hooks'

function ParticipantsTable(props) {
  const [changeGroupModalOpen, setChangeGroupModalOpen] = useState(false)
  const [bonusPointsModalOpen, setBonusPointsModalOpen] = useState(false)
  const [chosenStudent, setChosenStudent] = useState()
  const [studentsList, setStudentsList] = useState([])

  const allStudentsData = useGetStudentsWithGroupAllQuery({
    skip: props.groupId && props.groupName
  })
  const groupStudentsData = useGetGroupStudentsQuery(props.groupId, {
    skip: !(props.groupId && props.groupName)
  })

  useEffect(() => {
    if (allStudentsData.data) {
      setStudentsList([...allStudentsData.data])
    }
    // eslint-disable-next-line
  }, [allStudentsData.isSuccess])

  useEffect(() => {
    if (groupStudentsData.data) {
      const responseWithGroupName = groupStudentsData.data?.map((student) => {
        return { ...student, groupName: props.groupName }
      })
      setStudentsList(responseWithGroupName)
    }
    // eslint-disable-next-line
  }, [groupStudentsData.isSuccess])

  return (
    <GameCardOptionPick style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      <TableContainer>
        <thead>
          <tr>
            <th>Nazwa grupy</th>
            <th>Imię i nazwisko członka</th>
            <th className={'text-center'}>Akcje</th>
          </tr>
        </thead>
        <tbody className={'mh-100'}>
          {studentsList?.length > 0 ? (
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
                      setChangeGroupModalOpen(true)
                    }}
                  >
                    Zmień grupę
                  </Button>
                  <Button
                    className={'ms-2'}
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
                <p>{allStudentsData.isError || groupStudentsData.isError ? ERROR_OCCURRED : 'Brak członków'}</p>
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
