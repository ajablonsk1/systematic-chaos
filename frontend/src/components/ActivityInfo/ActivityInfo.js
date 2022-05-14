import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InfoContainer } from './InfoContainer';
import Loader from '../Loader/Loader';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import { getActivityAtID } from '../../utils/Api';
import ActivityContent from './ActivityContent';

export default function ActivityInfo() {
    const { activityId } = useParams();

    useEffect(() => {
        // console.log(activityId);
    }, [activityId]);

    const activity = getActivityAtID(0, activityId);

    // in the future we can get activity from activitys list using id in props
    return (
        <ContentWithoutMargin>
            <InfoContainer>
                {activityId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityContent activity={activity} activityId={activityId} />
                )}
            </InfoContainer>
        </ContentWithoutMargin>
    );
}
