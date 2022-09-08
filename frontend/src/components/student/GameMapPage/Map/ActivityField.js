import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getActivityImg,
  getActivityPath,
  getActivityTypeName,
  requirementValueConverter
} from '../../../../utils/constants'
import { ActivityCol, CustomOffcanvas } from './ActivityFieldStyle'
import { Button, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap'
import moment from 'moment'
import { getRequirements } from './mockData'
import { Tooltip } from '../../BadgesPage/BadgesStyle'

export default function ActivityField({
  activity,
  colClickable,
  colSize,
  isCompletedActivityAround,
  allActivitiesCompleted
}) {
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

  const offcanvasContent = useMemo(() => {
    const basicInfo = [
      { name: 'Nazwa aktywności', value: activity?.title },
      { name: 'Typ aktywności', value: getActivityTypeName(activity?.type) },
      { name: 'Punkty', value: activity?.points },
      { name: 'Data utworzenia', value: moment(Date.now()).format('DD.MM.YYYY, HH:mm') } // TODO: replace with activity?.creationDate
    ]
    return (
      <table>
        <tbody>
          <tr>
            <th colSpan={2}>Podstawowe informacje</th>
          </tr>
          {basicInfo.map((info, index) => (
            <tr key={index + Date.now()}>
              <td>{info.name}:</td>
              <td>{info.value}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={2}>Wymagania odblokowania</th>
          </tr>
          {requirements.map((requirement, index) => (
            <tr key={index + Date.now()}>
              <td>{requirement.name}:</td>
              <td>{requirementValueConverter(requirement)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }, [activity, requirements])

  return (
    <>
      <ActivityCol $isClickable={colClickable} $colSize={colSize}>
        {activity ? (
          <div style={{ backgroundColor: allActivitiesCompleted || activity?.isCompleted ? 'transparent' : 'white' }}>
            <Tooltip>
              <img src={getActivityImg(activity.type)} alt='activityImg' onClick={() => setIsOffcanvasOpen(true)} />
              <div style={{ height: 40 }}>{getActivityTypeName(activity.type)}</div>
            </Tooltip>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: allActivitiesCompleted || isCompletedActivityAround ? 'transparent' : 'white'
            }}
          />
        )}
      </ActivityCol>
      <CustomOffcanvas placement={'end'} show={isOffcanvasOpen} onHide={() => setIsOffcanvasOpen(false)}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>Szczegóły aktywności</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          {offcanvasContent}
          {colClickable && (
            <Button
              variant={'outline-warning'}
              className={'position-relative start-50 translate-middle-x mt-3'}
              onClick={startActivity}
            >
              Rozpocznij
            </Button>
          )}
        </OffcanvasBody>
      </CustomOffcanvas>
    </>
  )
}
