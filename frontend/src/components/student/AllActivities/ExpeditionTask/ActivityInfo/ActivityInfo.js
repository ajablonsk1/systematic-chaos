import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from '../../../../App/AppGeneralStyles'
import ActivityContent from './ActivityContent'
import Loader from '../../../../general/Loader/Loader'
import ExpeditionService from '../../../../../services/expedition.service'
import { ERROR_OCCURRED } from '../../../../../utils/constants'
import { connect } from 'react-redux'

function ActivityInfo(props) {
  const location = useLocation()
  const { activityId } = location.state
  const [activity, setActivity] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  useEffect(() => {
    ExpeditionService.getExpedition(activityId)
      .then((response) => {
        setActivity(response)
      })
      .catch(() => {
        setErrorMessage(ERROR_OCCURRED)
      })
  }, [activityId])

  // in the future we can get activity from activities list using id in props
  return (
    <Content>
      {!activity && !errorMessage ? (
        <Loader />
      ) : errorMessage ? (
        <p className={'text-center h4'} style={{ color: props.theme.danger }}>
          {errorMessage}
        </p>
      ) : (
        <ActivityContent activity={activity} activityId={activityId} />
      )}
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityInfo)
