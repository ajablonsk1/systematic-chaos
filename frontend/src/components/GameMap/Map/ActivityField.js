import React, { useLayoutEffect, useRef } from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getActivityImg, PageRoutes } from '../../../utils/constants';

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
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

export default function AcrivityField({ activity }) {
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

    const startActivity = () => {
        // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
        navigate(`${PageRoutes.ACTIVITY_INFO}`, { state: { activityId: activity.id } });
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
                <></>
            )}
        </ActivityCol>
    );
}
