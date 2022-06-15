import React from 'react';
import { useLocation } from 'react-router-dom';
import { getInformation } from '../../storage/information';
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import {
    HeaderRow,
    HeaderCol,
    ActivityImg,
    ActivityName,
    ActivityType,
    ActivityCol,
    FullDivider,
    SmallDivider,
} from '../ActivityInfo/ActivityInfoStyles';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import { Content } from '../App/AppGeneralStyles';
import { InformationImage } from './InformationStyles';


export default function Information() {
    const location = useLocation()
    const { activityId: informationId } = location.state;
    const information = getInformation(informationId);  // todo: endpoint

    return (
        <Content>
            <InfoContainer>
                <ActivityCol>
                    <HeaderCol>
                    <HeaderRow>
                        <ActivityImg src={getActivityImg(information.type)}></ActivityImg>
                        <ActivityType>{getActivityTypeName(information.type)}</ActivityType>
                        <ActivityName>{information.name}</ActivityName>
                        </HeaderRow>
                        <FullDivider />
                    </HeaderCol>
                    <div>
                        {information.images.map((image, idx) => (
                            <InformationImage src={image} alt={idx} key={idx}/>
                        ))}
                    </div>
                    {information.images.length ? <SmallDivider /> : <></>}
                    <div>
                        <p>{information.content}</p>
                    </div>
                </ActivityCol>
            </InfoContainer>
        </Content>
    )
}