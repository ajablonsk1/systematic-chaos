import React, { useState } from 'react'
import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'
import { TableContainer } from './ParticipantsStyles'
import ChangeGroupModal from './ChangeGroupModal'
import { Button } from 'react-bootstrap'

function ParticipantsTable(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [chosenStudent, setChosenStudent] = useState()

  const participants = props.data.participants

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
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <tr key={index + participant.groupName}>
                <td className={'py-2'}>{participant.groupName}</td>
                <td className={'py-2'}>{participant.name}</td>
                <td className={'py-2 text-center'}>
                  <Button
                    style={{ backgroundColor: 'var(--button-green)', border: 'none' }}
                    onClick={() => {
                      setChosenStudent(participant)
                      setModalOpen(true)
                    }}
                  >
                    Zmień grupę
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <p>Brak członków</p>
          )}
        </tbody>
      </TableContainer>
      <ChangeGroupModal show={modalOpen} setModalOpen={setModalOpen} data={chosenStudent} />
    </GameCardOptionPick>
  )
}

export default ParticipantsTable
