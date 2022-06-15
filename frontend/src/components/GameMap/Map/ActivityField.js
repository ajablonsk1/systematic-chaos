import React, { useLayoutEffect, useRef } from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getActivityByPosition } from '../../../storage/activityMap';
import { getActivityImg, getActivityPath } from '../../../utils/constants';


// todo: move to styles file
const ActivityCol = styled(Col)`
    border: 2px black solid;
    border-radius: 5px;
    width: auto;
    height: auto;
    margin: 1px;
    padding: 0;

    & img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    & div {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;


// todo: wrong name, typo
export default function AcrivityField({ activity, posX, posY }) {
    const activityCol = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        function setHeight() {
            if (activityCol.current) {
                activityCol.current.setAttribute(
                    'style',
                    `height:${activityCol.current.offsetWidth}px`
                );
            }
        }

        setHeight(); // first time, on component mount
        window.addEventListener('resize', setHeight); // always when window resize
    });

    // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
    const startActivity = () => {
        navigate(`${getActivityPath(activity.activityType)}`, {
            state: { activityId: activity.id },
        });
    };

    const isCompletedActivityAround = () => {
        for (let i = posX - 1; i <= posX + 1; i++) {
            for (let j = posY - 1; j <= posY + 1; j++) {
                const adjacentActivity = getActivityByPosition(0, i, j);

                if (adjacentActivity && adjacentActivity.completed) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <ActivityCol ref={activityCol}>
            {activity ? (
                <img
                    src={getActivityImg(activity.activityType)}
                    alt="activityImg"
                    onClick={startActivity}
                />
            ) : (
                <div
                    style={{
                        backgroundColor: isCompletedActivityAround() ? 'transparent' : 'white',
                    }}
                />
            )}
        </ActivityCol>
    );
}
