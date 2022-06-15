import React from 'react';
import { useLocation } from 'react-router-dom';
import { InfoContainer } from './InfoContainer';
import Loader from '../Loader/Loader';
import { Content } from '../App/AppGeneralStyles';
import ActivityContent from './ActivityContent';
import StudentService from "../../services/student.service"

export default function ActivityInfo() {
    const location = useLocation();
    const { activityId } = location.state;
    const activity = StudentService.getActivity(activityId);

    // in the future we can get activity from activitys list using id in props
    return (
        <Content>
            <InfoContainer fluid className="p-0">
                {activityId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityContent activity={activity} activityId={activityId} />
                )}
            </InfoContainer>
        </Content>
    );
}
