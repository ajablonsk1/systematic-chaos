import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getActivityByPosition } from '../../../../storage/activityMap'
import { getActivityImg, getActivityPath, getActivityTypeName } from '../../../../utils/constants'
import { ActivityCol, CustomOffcanvas, OffcanvasTable } from './ActivityFieldStyle'
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap'
import moment from 'moment'
import { getRequirements } from './mockData'

export default function ActivityField({ activity, posX, posY, colClickable, colSize }) {
  const navigate = useNavigate()
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const requirements = getRequirements()

  // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
  const startActivity = () => {
    colClickable &&
      navigate(`${getActivityPath(activity.type)}`, {
        state: { activityId: activity.id }
      })
  }

  const isCompletedActivityAround = () => {
    for (let i = posX - 1; i <= posX + 1; i++) {
      for (let j = posY - 1; j <= posY + 1; j++) {
        const adjacentActivity = getActivityByPosition(0, i, j)

        if (adjacentActivity && adjacentActivity.completed) {
          return true
        }
      }
    }
    return false
  }
  console.log(activity)
  return (
    <>
      <ActivityCol $isClickable={colClickable} $colSize={colSize}>
        {activity ? (
          <img src={getActivityImg(activity.type)} alt='activityImg' onClick={() => setIsOffcanvasOpen(true)} />
        ) : (
          <div
            style={{
              backgroundColor: isCompletedActivityAround() ? 'transparent' : 'white'
            }}
          />
        )}
      </ActivityCol>
      <CustomOffcanvas placement={'end'} show={isOffcanvasOpen} onHide={() => setIsOffcanvasOpen(false)}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>Szczegóły aktywności</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>Podstawowe informacje</th>
              </tr>
              <tr>
                <td>Nazwa aktywności:</td>
                <td>{activity?.title}</td>
              </tr>
              <tr>
                <td>Typ aktywności:</td>
                <td>{getActivityTypeName(activity?.type)}</td>
              </tr>
              <tr>
                <td>Punkty:</td>
                <td>{activity?.points}</td>
              </tr>
              <tr>
                <td>Data utworzenia:</td>
                <td>{moment(Date.now()).format('DD.MM.YYYY, HH:mm')}</td>
              </tr>
              <tr>
                <th colSpan={2}>Wymagania odblokowania</th>
              </tr>
              {requirements.map((requirement, index) => (
                <tr key={index + Date.now()}>
                  <td>{requirement.name}:</td>
                  <td>{requirement.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            variant={'outline-warning'}
            className={'position-relative start-50 translate-middle-x mt-3'}
            onClick={startActivity}
          >
            Rozpocznij
          </Button>
        </OffcanvasBody>
      </CustomOffcanvas>
    </>
  )
}
