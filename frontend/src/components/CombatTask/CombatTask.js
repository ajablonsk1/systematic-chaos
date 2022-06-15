import React from 'react';
import { useLocation } from 'react-router-dom';
import { Content } from '../App/AppGeneralStyles';
import Loader from '../Loader/Loader';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import {
    HeaderRow,
    HeaderCol,
    ActivityImg,
    ActivityName,
    ActivityType,
    FullDivider,
    ActivityCol,
    SmallDivider,
} from '../ActivityInfo/ActivityInfoStyles';
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import FileService from './FileService';
import { getCombatTask } from '../../storage/combatTask';

export default function CombatTask() {
    const location = useLocation();
    const { activityId: taskId } = location.state;
    const task = getCombatTask(taskId); // todo: endpoint needed

    return (
        <Content>
            <InfoContainer fluid className="p-0">
                {taskId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityCol className="invisible-scroll">
                        <HeaderCol>
                            <HeaderRow>
                                <ActivityImg src={getActivityImg(task.type)}></ActivityImg>
                                <ActivityType>{getActivityTypeName(task.type)}</ActivityType>
                                <ActivityName>{task.name}</ActivityName>
                            </HeaderRow>
                            <FullDivider />
                        </HeaderCol>
                        <div>
                            <h5>{task.description}</h5>
                            <SmallDivider />
                            <p>
                                Zdobyte punkty: <strong>50 / 100</strong> {/*//TODO: info from endpoint*/}
                            </p>
                            <p>
                                <strong>Uwagi prowadzącego:</strong> <br /> Zabrakło mi kilku
                                rzeczy, zaznaczyłem w pliku co mi się nie podoba. Proszę sobie
                                pobrać i sprawdzić {/*//TODO: info from endpoint*/}
                            </p>
                            <SmallDivider />
                            <FileService taskId={task.id} />
                        </div>
                    </ActivityCol>
                )}
            </InfoContainer>
        </Content>
    );
}
