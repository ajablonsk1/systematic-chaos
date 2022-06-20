import React from 'react';
import { useLocation } from 'react-router-dom';
import { InfoContainer } from './InfoContainer';
import { Content } from '../App/AppGeneralStyles';
import ActivityContent from './ActivityContent';
import StudentService from "../../services/student.service"
import {useState} from "react";
import {useEffect} from "react";

export default function ActivityInfo() {
    const location = useLocation();
    const { activityId } = location.state;
    const [activity, setActivity] = useState(undefined);


    useEffect(() => {
        StudentService.getActivity(activityId).then(response => {
            setActivity(response);
        });
    }, [activityId])


    //console.log(activity);

    // in the future we can get activity from activities list using id in props
    return (
        <Content>
            {activity &&
                <InfoContainer fluid className="p-0">
                    <ActivityContent activity={activity} activityId={activityId} />
                </InfoContainer>
            }
        </Content>
    );
}
