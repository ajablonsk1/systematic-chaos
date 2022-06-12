import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRemainingTime, timer } from '../../utils/storageManager';
import { TimerContainer } from './TimerStyle';

export default function Timer(props) {
    const location = useLocation();
    const { activityId } = location.state;
    const navigate = useNavigate();
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(
        getRemainingTime(activityId)
    );
    const [remainingTime, setRemainingTime] = useState(timer(remainingTimeInSeconds));
    const [timerInterval, setTimerInterval] = useState();

    useEffect(() => {
        setTimerInterval(
            setInterval(function () {
                setRemainingTimeInSeconds(getRemainingTime(activityId));
            }, 1000)
        );
    }, [activityId]);

    // complete the expedition and record user responses if the expedition has not been completed
    // before the timer runs out
    useEffect(() => {
        if (remainingTimeInSeconds === 0) {
            clearInterval(timerInterval);
        } else {
            setRemainingTime(timer(remainingTimeInSeconds));
        }
    }, [remainingTimeInSeconds, activityId, navigate, remainingTime, timerInterval]);

    return (
        <>
            <TimerContainer time={remainingTimeInSeconds}>{remainingTime}</TimerContainer>
            {React.cloneElement(props.children, {
                remainingTime: remainingTimeInSeconds,
            })}
        </>
    );
}
