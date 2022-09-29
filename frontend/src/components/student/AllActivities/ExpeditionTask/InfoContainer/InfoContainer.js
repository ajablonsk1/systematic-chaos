import React, { useEffect, useState } from 'react'
import { getTimer } from '../../../../../utils/storageManager'
import { PointsProgressBar, TimerContainer } from './InfoContainerStyle'
import GraphPreview from './GraphPreview'

export default function InfoContainer(props) {
  const { timeToSolveMillis, activityId, endAction } = props
  const [remainingTime, setRemainingTime] = useState(undefined)
  const [timer, setTimer] = useState('')
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    const timeInSeconds = timeToSolveMillis / 1000
    setRemainingTime(timeInSeconds)
    if (timerInterval == null) {
      setTimerInterval(
        setInterval(function () {
          setRemainingTime((prevState) => prevState - 1)
        }, 1000)
      )
    }
  }, [timeToSolveMillis, timerInterval])

  // complete the expedition and record user responses if the expedition has not been completed
  // before the timer runs out
  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval)
      endAction()
    } else {
      setTimer(getTimer(remainingTime))
    }
  }, [activityId, remainingTime, timerInterval, endAction])

  return (
    <div className={'d-flex justify-content-center'}>
      <TimerContainer time={remainingTime}>{timer}</TimerContainer>
      <PointsProgressBar
        now={props.actualPoints}
        max={props.maxPoints}
        label={`${props.actualPoints}/${props.maxPoints}`}
        variant={'success'}
      />
      <GraphPreview
        activityId={props.activityId}
        currentQuestionsPath={props.questionsPath}
        actualQuestionId={props.actualQuestionId}
      />
      {React.cloneElement(props.children, {
        remainingTime: remainingTime
      })}
    </div>
  )
}
