import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
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
import StudentService from "../../services/student.service";
import Loader from "../Loader/Loader";


export default function Information() {
    const location = useLocation()
    const { activityId: informationId } = location.state;

    const [information, setInformation] = useState();  // todo: endpoint

    useEffect(() => {
        StudentService.getInformation(informationId).then(response => {
            console.log(response);
            setInformation(response);
        })
    }, [informationId])

    return (
        <>
            {!information ?
                (<Loader/>)
                : (<Content>
                    <InfoContainer>
                        <ActivityCol>
                            <HeaderCol>
                                <HeaderRow>
                                    <ActivityImg src={getActivityImg('INFO')}></ActivityImg>
                                    <ActivityType>{getActivityTypeName('INFO')}</ActivityType>
                                    <ActivityName>{information.name}</ActivityName>
                                </HeaderRow>
                                <FullDivider />
                            </HeaderCol>
                            <div>
                                {information.imageUrls.map((image, idx) => (
                                    <InformationImage src={image} alt={idx} key={idx}/>
                                ))}
                            </div>
                            {information.imageUrls.length ? <SmallDivider /> : <></>}
                            <div>
                                <p>{information.description}</p>
                            </div>
                        </ActivityCol>
                    </InfoContainer>
                </Content>)}
        </>

    )
}
