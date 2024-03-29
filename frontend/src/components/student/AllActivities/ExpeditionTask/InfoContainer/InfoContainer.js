import React, { useEffect, useMemo, useState } from 'react'
import { getTimer } from '../../../../../utils/storageManager'
import { TimerContainer } from './InfoContainerStyle'
import GraphPreview from './GraphPreview'
import { PercentageBar } from '../../../BadgesPage/BadgesStyle'
import { isMobileView } from '../../../../../utils/mobileHelper'
import SuperPower from '../SuperPower/SuperPower'

const mobileViewStyle = {
  right: '50%',
  left: 'auto',
  top: '30px',
  transform: 'translateX(50%)',
  position: 'absolute'
}

const desktopViewStyle = {
  right: '10px',
  left: 'auto',
  top: '20px',
  transform: 'none'
}

export default function InfoContainer(props) {
  const { timeToSolveMillis, activityId, endAction } = props
  const [remainingTime, setRemainingTime] = useState(undefined)
  const [timer, setTimer] = useState('')
  const [timerInterval, setTimerInterval] = useState(null)

  const setIntervalForTimer = () => {
    setTimerInterval(
      setInterval(function () {
        setRemainingTime((prevState) => prevState - 1)
      }, 1000)
    )
  }

  useEffect(() => {
    const timeInSeconds = timeToSolveMillis / 1000
    setRemainingTime(timeInSeconds)
    if (timerInterval == null) {
      setIntervalForTimer()
    }

    // eslint-disable-next-line
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
  }, [activityId, remainingTime, timerInterval, endAction])

  const changeRemainingTime = (updatedRemainingTime) => {
    clearInterval(timerInterval)
    setRemainingTime(updatedRemainingTime)
    setIntervalForTimer()
  }

  const percentageBar = useMemo(() => {
    const PERCENTAGE_BAR_WIDTH = 300
    const PERCENTAGE_BAR_HEIGHT = 20
    const GREEN_BAR_WIDTH = ((props.actualPoints / props.maxPoints) * PERCENTAGE_BAR_WIDTH).toFixed(0)

    return (
      <PercentageBar
        $greenBarWidth={GREEN_BAR_WIDTH}
        $grayBarWidth={PERCENTAGE_BAR_WIDTH}
        $height={PERCENTAGE_BAR_HEIGHT}
        style={isMobileView() ? mobileViewStyle : desktopViewStyle}
      >
        <strong className={'d-flex justify-content-center'}>{`${props.actualPoints?.toFixed(2)}/${
          props.maxPoints
        }`}</strong>
      </PercentageBar>
    )
  }, [props.actualPoints, props.maxPoints])

  return (
    <div className={'d-flex justify-content-center'}>
      <TimerContainer time={remainingTime}>{timer}</TimerContainer>
      {percentageBar}
      <GraphPreview
        activityId={props.activityId}
        currentQuestionsPath={props.questionsPath}
        actualQuestionId={props.actualQuestionId}
      />
      <SuperPower
        setRemainingTime={changeRemainingTime}
        activityId={activityId}
        questions={props.questions}
        status={props.status}
      />
      {React.cloneElement(props.children, {
        remainingTime: remainingTime
      })}
    </div>
  )
}
