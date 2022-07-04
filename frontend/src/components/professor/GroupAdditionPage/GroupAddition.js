import React from 'react';
import {
    ActivityCol,
    ActivityType,
    FullDivider,
    HeaderCol,
    HeaderRow,
} from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles';
import { InfoContainer } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/InfoContainer';
import { Content } from '../../App/AppGeneralStyles';
import GroupAdditionForm from './GroupAdditionForm';

export default function GroupAddition() {
    return (
        <Content>
            <InfoContainer>
                <ActivityCol>
                    <HeaderCol>
                        <HeaderRow>
                            <ActivityType>Dodaj grupę</ActivityType>
                        </HeaderRow>
                        <FullDivider />
                    </HeaderCol>
                    <GroupAdditionForm />
                </ActivityCol>
            </InfoContainer>
        </Content>
    );
}
