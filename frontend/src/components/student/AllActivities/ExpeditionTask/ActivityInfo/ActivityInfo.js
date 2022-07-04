import React from 'react';
import { useLocation } from 'react-router-dom';
import { InfoContainer } from './InfoContainer';
import { Content } from '../../../../App/AppGeneralStyles';
import ActivityContent from './ActivityContent';
import {useState} from "react";
import {useEffect} from "react";
import Loader from "../../../../general/Loader/Loader";
import ExpeditionService from "../../../../../services/expedition.service";

export default function ActivityInfo() {
    const location = useLocation();
    const { activityId } = location.state;
    const [activity, setActivity] = useState(undefined);


    useEffect(() => {
        ExpeditionService.getExpedition(activityId).then(response => {
            setActivity(response);
        });
    }, [activityId])


    // in the future we can get activity from activities list using id in props
    return (
        <Content>
            {!activity ? <Loader/> : (
                <InfoContainer fluid className="p-0">
                    <ActivityContent activity={activity} activityId={activityId} />
                </InfoContainer>
            )}
        </Content>
    );
}
