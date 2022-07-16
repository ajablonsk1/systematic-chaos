import React from 'react'
import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'
import { GameButton } from '../../student/GameCardPage/GameButton'
import { TableContainer } from './ParticipantsStyles'

function ParticipantsTable(props) {
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
                <td className={'py-0'}>{participant.groupName}</td>
                <td className={'py-0'}>{participant.name}</td>
                <td className={'py-0'}>
                  <GameButton text={'Zmień grupę'} customWidth={'auto'} />
                </td>
              </tr>
            ))
          ) : (
            <p>Brak członków</p>
          )}
        </tbody>
      </TableContainer>
    </GameCardOptionPick>
  )
}

export default ParticipantsTable
