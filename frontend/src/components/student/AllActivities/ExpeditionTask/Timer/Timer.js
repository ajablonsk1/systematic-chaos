import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTimer } from '../../../../../utils/storageManager'
import { TimerContainer } from './TimerStyle'

export default function Timer(props) {
  const navigate = useNavigate()
  const { timeToSolveMillis, activityId, endAction } = props
  const [remainingTime, setRemainingTime] = useState(undefined)
  const [timer, setTimer] = useState('')
  const [timerInterval, setTimerInterval] = useState(null)

  // console.log(props)

  useEffect(() => {
    // console.log(timeToSolveMillis)
    const timeInSeconds = timeToSolveMillis / 1000
    setRemainingTime(timeInSeconds)
    setTimerInterval(
      setInterval(function () {
        setRemainingTime((prevState) => prevState - 1)
      }, 1000)
    )
  }, [timeToSolveMillis])

  // complete the expedition and record user responses if the expedition has not been completed
  // before the timer runs out
  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval)
      endAction()
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
