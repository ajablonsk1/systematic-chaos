import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ERROR_OCCURRED,
  getActivityImg,
  getActivityPath,
  getActivityTypeName,
  requirementValueConverter
} from '../../../../utils/constants'
import { ActivityCol, CustomOffcanvas } from './ActivityFieldStyle'
import { Button, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Spinner } from 'react-bootstrap'
import moment from 'moment'
import { Tooltip } from '../../BadgesPage/BadgesStyle'
import ActivityService from '../../../../services/activity.service'
import { connect } from 'react-redux'

function ActivityField(props) {
  const { activity, colClickable, colSize, isCompletedActivityAround, allActivitiesCompleted } = props
  const navigate = useNavigate()
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [requirements, setRequirements] = useState(undefined)

  useEffect(() => {
    if (activity) {
      ActivityService.getActivityRequirements(activity.id)
        .then((response) => {
          setRequirements(response?.filter((requirement) => requirement.selected))
        })
        .catch(() => {
          setRequirements(null)
        })
    }
  }, [activity])

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
          {requirements === undefined ? (
            <tr>
              <td colSpan={2} className={'text-center'}>
                <Spinner animation={'border'} />
              </td>
            </tr>
          ) : requirements == null ? (
            <tr>
              <td colSpan={2} className={'text-center'}>
                <p>{ERROR_OCCURRED}</p>
              </td>
            </tr>
          ) : !requirements.length ? (
            <tr>
              <td colSpan={2} className={'text-center'}>
                <p>Brak wymagań dla aktywności</p>
              </td>
            </tr>
          ) : (
            requirements.map((requirement, index) => (
              <tr key={index + Date.now()}>
                <td>{requirement.name}:</td>
                <td>{requirementValueConverter(requirement)}</td>
              </tr>
            ))
          )}
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
      <CustomOffcanvas
        $background={props.theme.secondary}
        $fontColor={props.theme.font}
        placement={'end'}
        show={isOffcanvasOpen}
        onHide={() => setIsOffcanvasOpen(false)}
      >
        <OffcanvasHeader /*closeButton*/>
          <OffcanvasTitle>Szczegóły aktywności</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          {offcanvasContent}
          {colClickable && (
            <Button
              style={{ backgroundColor: 'transparent', borderColor: props.theme.warning, color: props.theme.warning }}
              disabled={!activity?.isFulfilled}
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

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityField)
