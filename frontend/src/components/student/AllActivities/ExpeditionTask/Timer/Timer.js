import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTimer } from '../../../../../utils/storageManager'
import { TimerContainer } from './TimerStyle'
import ExpeditionService from '../../../../../services/expedition.service'

export default function Timer(props) {
  const location = useLocation()
  const { activityId, timeToSolveMillis, taskResultId } = location.state
  const navigate = useNavigate()

  const [remainingTime, setRemainingTime] = useState(undefined)
  const [timer, setTimer] = useState('')
  const [isRemainingTimeLoaded, setIsRemainingTimeLoaded] = useState(false)
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    ExpeditionService.getRemainingTime(taskResultId)
      .then((response) => {
        const timeInSeconds = +response / 1000
        setRemainingTime(timeInSeconds)
        setIsRemainingTimeLoaded(true)
      })
      .catch(() => {
        setRemainingTime(null)
      })
  }, [taskResultId, timeToSolveMillis])

  useEffect(() => {
    if (isRemainingTimeLoaded) {
      setTimerInterval(
        setInterval(function () {
          setRemainingTime((prevState) => prevState - 1)
        }, 1000)
      )
    }
  }, [isRemainingTimeLoaded])

  // complete the expedition and record user responses if the expedition has not been completed
  // before the timer runs out
  useEffect(() => {
    if (remainingTime === 0) {
      clearInterval(timerInterval)
    } else {
      setTimer(getTimer(remainingTime))
    }
  }, [activityId, navigate, remainingTime, timerInterval])

  return (
    <>
      <TimerContainer time={remainingTime}>{timer}</TimerContainer>
      {React.cloneElement(props.children, {
        remainingTime: remainingTime
      })}
    </>
  )
}
